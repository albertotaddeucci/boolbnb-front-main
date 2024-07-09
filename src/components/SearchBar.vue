<script>
import { store } from '../store';
import axios from 'axios';
import FilterSearchBar from './FilterSearchBar.vue';

export default {
  name: 'SearchBar',

  components:{
    FilterSearchBar
  },

  data() {
    return {
      store,
      listItem: [], // Lista per i suggerimenti di autocompletamento
      showDropdown: false, // Controlla la visibilità del menu a cascata della ricerca
      latitude:null,
      longitude:null,
      radius:0, //segna i chilometri selezionati dall'utenete per la ricerca
    };
  },
  methods: {
    // Metodo per chiamare l'API di TomTom e ottenere suggerimenti di indirizzi basati sull'input dell'utente
    apiCall() {
      // Reset della lista di suggerimenti
      this.listItem = [];
      // Componi l'URL per l'API di TomTom utilizzando la chiave e l'input dell'utente
      axios.get('https://api.tomtom.com/search/2/geocode/' + this.store.inputSearch + '.json?key=N4I4VUaeK36jrRC3vR5FfWqJS6fP6oTY&limit=3')
        .then(res => {
          // Memorizza i risultati dell'API nello store
          this.store.addresses = res.data.results;
          // Aggiungi ogni indirizzo ottenuto dalla risposta API alla lista di suggerimenti
          this.store.addresses.forEach(element => {
            this.listItem.push(element.address.freeformAddress);
          });
          // Mostra il dmenu a cascata se ci sono suggerimenti nella lista
          this.showDropdown = this.listItem.length > 0;
        })
        .catch(error => {
          console.error('Errore durante il geocoding:', error);
        });
    },
    // Metodo per scegliere un indirizzo dai suggerimenti e cercare appartamenti vicini
    chooseAddress(item) {
      // Imposta l'input di ricerca con l'elemento selezionato
      this.store.inputSearch = item;
      // Nasconde il menù
      this.showDropdown = false;
      // Trova l'indirizzo selezionato nella lista degli indirizzi memorizzati
      
    },

    runSearch(){
      const selectedAddress = this.store.addresses.find(address => {
        // Verifica se l'indirizzo corrente ha lo stesso freeformAddress di item
        return address.address.freeformAddress === this.store.inputSearch;
      });
      // Se è stato trovato un indirizzo corrispondente in addresses
      if (selectedAddress) {
        // Ottieni latitudine e longitudine dell'indirizzo selezionato
        store.latitude = selectedAddress.position.lat;
        store.longitude = selectedAddress.position.lon;
        // Esegui una richiesta GET alla tua API per cercare appartamenti vicini
        axios.get('http://127.0.0.1:8000/api/search', {
          params: { latitude: store.latitude, longitude: store.longitude, radius:this.radius}
        })
          .then(res => {
            // Memorizza i risultati degli appartamenti nello store
            
            for(let i=1; i<res.data.results.length;i++){
              if(res.data.results[i].id == res.data.results[i-1].id){
                res.data.results.splice(i,1);
                i--;
              }
            }
            
            this.store.apartments = res.data.results;


            console.log(this.store.apartments);
          })
          .catch(error => {
            console.error('Errore durante la ricerca degli appartamenti:', error);
          });
      }
    }
  }
};
</script>

<template>

  
  <div class="container">
    
    <div id="search-bar-wrapper" class="col-12 col-sm-8 col-lg-5">
      
      <div id="search-icon">
        <i class="fa-solid fa-house"></i>
      </div>
      
      <div class="text">
        <input class="search-input ms-2" type="search" v-model="store.inputSearch"
        placeholder="Inserisci un indirizzo..." @input="apiCall" @focus="showDropdown = true"
        @blur="showDropdown = false">
        <!-- Lista di suggerimenti mostrata come un menu a cascata -->
        <ul class="list-group position-absolute " v-show="showDropdown">
          <!-- Itera su ogni elemento in listItem per creare un elemento della lista -->
          <li class="list-group-item list-group-item-action" v-for="item in listItem" 
             @mousedown="chooseAddress(item)">
            {{ item }} 
            <!-- Visualizza il suggerimento di indirizzo -->
          </li>
        </ul>
      </div>

      <div class="button">
        <router-link :to="{ name: 'SearchPage' }" @click=" runSearch()" class="btn my_btn me-2">
          Cerca
        </router-link>
      </div>

    </div>

  </div>




</template>
<style lang="scss"scoped>
/* Stile per posizionare gli elementi in modo assoluto rispetto al loro contenitore /
.position-relative {
  z-index: 1000;
}

.bord {
  border-color: #006769c0;
}

/ Stile per gli elementi della lista di suggerimenti, cambiando il cursore su pointer */

.container{
  display: flex;

  align-items: center;
  justify-content: center;


  transform: translate(0,-50%);
}

#search-bar-wrapper{
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  padding:20px 30px;

  border:1px solid #006769c0;
  border-radius: 40px;

  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;

  background-color: white;

  .text{
    position:relative;
  }

  #search-icon{
    color:#006769c0;
  }

  .search-input{
    border: none;
    border-bottom:1px solid rgba(0, 0, 0, 0.23);
    transition: .3s;

      &:focus{
        outline:none;
        border-bottom:1px solid black;
      }
  }

}


@media screen and (max-width:400px) {
  #search-bar-wrapper{

    padding:15px 25px;

    .search-input{
      width:100px;
    }
  }

}


.list-group-item {
  cursor: pointer;
}

.form-control.ms-2 {
  width: 240px;
}

.search-bar {
  border-radius: 12px;
  position: relative;
  bottom: 28px;
}

.navbar .form-control:focus {
  background-color: #ffffff;
  color: black;
  border-color: #006769c0;
  box-shadow: 0 0 6px #006769c0;
}

input[type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: none;
  height: 20px;
  width: 20px;
  background: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23006769c0"%3E%3Cpath d="M0 0h24v24H0z" fill="none"/%3E%3Cpath d="M12 10.585l4.95-4.95 1.415 1.414L13.414 12l4.95 4.95-1.415 1.414L12 13.414l-4.95 4.95-1.414-1.414L10.585 12l-4.95-4.95 1.414-1.414L12 10.585z"/%3E%3C/svg%3E') no-repeat center;
  cursor: pointer;
}

.my_btn {
  border: 1px solid #006769c0;
  background-color: white;

  font-weight: bold;
  color: #006769c0;

  padding-inline: 18px;
  border-radius: 20px;

  &:hover {
    border: 1px solid white;
    background-color: #006769c0;
    color: white;
  }
}

</style>