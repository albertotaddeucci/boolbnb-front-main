<script>
import axios from 'axios';
import { store } from '../../store.js';
import ApartmentCard from '../ApartmentCard.vue';

export default {
  data() {
    return {
      baseApiUrl: 'http://127.0.0.1:8000/api/',
      store,
    };
  },
  components: {
    ApartmentCard
  },

  created() {

    axios.get('http://127.0.0.1:8000/api/all-sponsorship', {
    })
      .then(res => {
        for (let i = 1; i < res.data.results.length; i++) {
          if (res.data.results[i].id == res.data.results[i - 1].id) {
            res.data.results.splice(i, 1);
            i--;
          }
        }
        this.store.apartments = res.data.results;
        console.log(res);
      })
      .catch(error => {
        console.error('Errore durante la ricerca degli appartamenti:', error);
      });
  }
}
</script>


<template>

  <div>
    <h1 class="text-center mb-5 mt-3">Appartamenti In Evidenza</h1>

    <div class="container my-card mb-5">

      <div class="row row-gap-5 gap-5 justify-content-center mt-1 mb-5">

        <ApartmentCard class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" v-for="currentApartment in store.apartments"
          :apartment="currentApartment" :showDistance="false" :key="currentApartment.slug"></ApartmentCard>

      </div>

    </div>
  </div>

</template>


<style lang="scss" scoped>

.my-card {
  padding: 40px;
  border-radius: 20px;
  background-color: #eaf2f3;
}

</style>