<script>
import axios from 'axios';
import { store } from '../store.js';

export default {
    name: 'FilterSearchPage',


    data() {
        return {
        // apartments: [],
        baseApiUrl: 'http://127.0.0.1:8000/api/',
        store,
        radius:20,

        serviceList: [],

        }
    },

    mounted() {

        axios.get('http://127.0.0.1:8000/api/service')
            .then(res => {
                this.serviceList = res.data.results;
            })
            .catch(error => {
                console.error('Errore durante la ricerca degli appartamenti:', error);
            });

    },
    methods: {

        apiFilter() {
        

        axios.get('http://127.0.0.1:8000/api/filter', {
            params: {
            latitude: store.latitude, 
            longitude: store.longitude, 
            radius:this.radius,
            rooms: store.inputRooms,
            beds: store.inputBeds,
            bathrooms: store.inputBathrooms,
            sqMeters: store.inputSquaredMeters,
            services: store.services.length > 0 ? store.services : null // Passa i servizi selezionati, o null se nessun servizio è selezionato
            }
        })
        .then(res => {

            for(let i=1; i<res.data.results.length;i++){
              if(res.data.results[i].id == res.data.results[i-1].id){
                res.data.results.splice(i,1);
                i--;
              }
            }
            
            store.apartments = res.data.results;
            console.log(res.data);
        })
        .catch(error => {
            console.error('Errore durante la ricerca degli appartamenti:', error);
        });
        },

        toggleService(id) {
        const index = store.services.indexOf(id);
        if (index === -1) {
            // Aggiungi il servizio se non è già presente
            store.services.push(id);
        } else {
            // Rimuovi il servizio se è già presente
            store.services.splice(index, 1);
        }
        // Ora eseguiamo il filtro con i servizi selezionati
        this.apiFilter();
        },

        filterApartments() {
        this.apiFilter();
        }

    },
}
</script>

<template>

    <div class="filter-wrapper">

        <div id="inner" class="col-12 col-lg-8 col-md-10">

            <div id="top-bar" class="row">
                <div id="range" class="col-12 col-lg-4 d-flex flex-column pb-1">
                    <label for="radius" class="mb-3"><strong>Filtro di distanza:</strong> {{ radius }}km</label>
                    <input type="range" id="radius" min="1" max="30"  v-model="radius" @change="filterApartments">
    
                </div>
    
                <div id="apartment-info" class=" col-12 col-lg-8 row row-cols-2 m-0">
                    <div class="d-flex flex-column">
                        <label for="" class="p-1 fw-bold">Stanze</label>
                        <input type="number" class="info-input" v-model="store.inputRooms" @input="filterApartments" >
                    </div>
                
                    <div class="d-flex flex-column">
                        <label for="" class="p-1 fw-bold">Letti</label>
                        <input type="number" class="info-input" v-model="store.inputBeds" @input="filterApartments" >
                    </div>
                
                    <div class="d-flex flex-column">
                        <label for="" class="p-1 fw-bold">Bagni</label>
                        <input type="number" class="info-input" v-model="store.inputBathrooms" @input="filterApartments" >
                    </div>
                
                    <div class="d-flex flex-column">
                        <label for="" class="p-1 fw-bold">Grandezza (m²)</label>
                        <input type="number" class="info-input" v-model="store.inputSquaredMeters" @input="filterApartments" >
                    </div>
                </div>
            </div>
    
            <div id="bottom-bar" class="mt-2">
                <div id="services">
    
                    <strong class="mb-3 p-1">Servizi disponibili</strong>
                    <div id="services-filter">
                        <div class="pt-2" v-for="service in serviceList">
                            <input  type="checkbox" class="btn-check prova" name="services[]" :id="`service-${service.id}`" :value="service.id" @change="toggleService(service.id)"> 
                            <label :for="`service-${service.id}`" class="service-btn label-btn" >
                                <div class="icon">
                                    <i :class="service.icon"></i>
                                    
                                </div>
                                <div class="name">
                                    {{ service.name }}
                                </div>
                            </label>
                        </div>
                    </div>
    
                </div>
            </div>

        </div>
        


    </div>


</template>

<style lang="scss" scoped>


.filter-wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 50px;
    

    #top-bar{
        flex-wrap: wrap;
        align-items: center;
    }


    #services-filter{
        width: 100%;
        display: flex;
        justify-content: space-evenly;


        .label-btn{
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }
}


.service-btn {
    width: 100%;

    border:1px solid transparent;
    font-weight: 600;

    color:rgba(0,0,0,.5);
    

    &:hover {
        border-bottom:1px solid #006769c0;
        cursor:pointer;
        color:rgba(0,0,0,1);
    }


}

input:checked+.service-btn {
    border-bottom:1px solid #006769c0;
    color:rgba(0,0,0,1);
}

.info-input{
    width: 100%;
    border: 2px solid #006769c0;
    
    border-radius: 20px;
    padding:6px 20px;
    color:black
}

#apartment-info > div:nth-of-type(2n + 1){
    padding-left: 0;
}

#apartment-info > div:nth-of-type(2n + 2){
    padding-right: 0;
}


@media screen and (max-width:430px){

    .filter-wrapper{

        #services-filter{
            position:relative;
            justify-content: space-between;
    
            overflow: auto;
            gap:10px;
          
    
            &>div>label>div[class="name"]{
                flex-shrink:0;
                text-align: center;
                width: 80px;
            }
        }
    }
}


</style>
