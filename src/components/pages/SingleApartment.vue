<script>
import axios from 'axios';
import { store } from '../../store';
import ContactForm from '../ContactForm.vue';
import Map from '../Map.vue';

export default {

  name: 'SingleApartment',
  components: {
    ContactForm,
    Map
  },

  data() {
    return {
      apartment: null,
      baseApiUrl: 'http://127.0.0.1:8000/api/'
    }
  },

  mounted() {
    this.fetchApartment();
    this.sendVisitToServer();
  },

  methods: {

    fetchApartment() {
      const apartmentSlug = this.$route.params.slug;
      axios.get(`${this.baseApiUrl}apartments/${apartmentSlug}`)
        .then(res => {
          if (res.data.success) {
            this.apartment = res.data.apartment;
            store.latitudeMap = res.data.apartment.latitude;
            store.longitudeMap = res.data.apartment.longitude;
          } else {
            this.$router.push({ name: 'HomePage' });
          }
        })
    },

    sendVisitToServer() {
      fetch('https://api.ipify.org/?format=json')
        .then(response => response.json())
        .then(data => {
          const ipAddress = data.ip;
          const apartmentId = this.apartment ? this.apartment.id : null;
          if (apartmentId) {
            axios.post(`${this.baseApiUrl}visits/store`, {
              ip: ipAddress,
              apartment: apartmentId
            })
              .then(res => {
                console.log(res.data);
              })
          }
        })
    }
  }
}
</script>

<template>

  <div>
    <div v-if="apartment" class="container">
      <div v-if="apartment.slug">
        <h1 class="py-4">{{ apartment.title }}</h1>
        <div class="position-relative overflow-hidden border border-success rounded">
          <div class="single-image">
            <img :src="apartment.image == null ? '/public/No-Image-Placeholder.svg.png' : 'http://127.0.0.1:8000/storage/' + apartment.image" class="img-fluid" alt="Cover Image">
          </div>
        </div>

        <div class="col-md-6 mb-4">
          <!-- <div v-else class="border border-danger rounded p-3">
              No image
          </div>
          <div class="py-4">
              <router-link :to="{name: 'HomePage'}" class="btn btn-outline-light text-uppercase fw-bold" >
                      Back Home
              </router-link>
          </div> -->
        </div>

        <div class="row pt-2 pb-4 mb-2">

          <div class="col-12 col-md-12 col-lg-6">
            <h4>{{ apartment.address }}</h4>

            <div class="row py-3">
              <div class="col-3 pe-4">
                <p class="text-center"><strong class="separator">{{ apartment.n_rooms }} </strong> stanze</p>
              </div>
              <div class="col-3 p-0 pe-4">
                <p class="text-center"><strong class="separator">{{ apartment.n_beds }}</strong> letti</p>
              </div>
              <div class="col-3 p-0 pe-4">
                <p class="text-center"><strong class="separator">{{ apartment.n_bathrooms }}</strong> bagni</p>
              </div>
              <div class="col-3 p-0">
                <p class="text-center"><strong>{{ apartment.squared_meters }} </strong> m²</p>
              </div>
            </div>

            <div class="row">
              <div v-if="apartment.services && apartment.services.length !== 0">
                <strong class="text">Servizi extra disponibili</strong>
                <div class="row py-3">
                  <div v-for="service in apartment.services" class="col-2">
                    <div class="text-center"><i :class="service.icon"></i></div>
                    <div class="text-center">{{ service.name }}</div>
                  </div>
                </div>
              </div>
              <p v-else><strong class="text">Nessun servizio extra disponibile</strong></p>
            </div>

            <hr>

            <div v-if="apartment.user_name">
              <p><strong class="text host"><i class="fa-solid fa-house-user"></i> Host</strong>{{ apartment.user_name }} {{ apartment.user_surname }}</p>
            </div>

            <p v-else><strong class="text host"><i class="fa-solid fa-house-user"></i> Host</strong> Nessuna informazione disponibile</p>

            <hr>

            <p>{{ apartment.description }}</p>

            <div class="row justify-content-center">
              <Map></Map>
            </div>

          </div>
          
          <div class="col-12 col-md-12 col-lg-6">
            <div class="box border p-3 rounded-2 ">
              <h4 class="text-center">Contatta l'host</h4 class="text-center">
              <ContactForm></ContactForm>
            </div>
          </div>
        </div>
      </div>
      
    </div>

    <!-- Caricamento -->
    <div v-else class="text-center py-3 text-light">
      <div class="spinner-border">
        <span class="visually-hidden text-white">Loading...</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.single-image {
  object-fit: cover;
  object-position: bottom;
  width: 100%;
  // height: 400px;
}

.border-color {
  border: 1px solid #006769c0;
}

.text {
  color: #006769c0;
}

p {
  position: relative;

  .separator::before {
    content: "";
    position: absolute;
    right: -10px;
    height: 100%;
    border-right: 1px solid #006769c0;
  }
}

.box {
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

.host {
  margin-right: 1em;
  border-bottom: 2px solid #006769c0;
}

@media screen and (min-width: 768px){

  .single-image{
    height: 300px;
  }
}

@media screen and (min-width: 768px){

.single-image{
  height: 300px;
}
}

@media screen and (min-width: 998px){

.single-image{
  height: 400px;
}
}
</style>