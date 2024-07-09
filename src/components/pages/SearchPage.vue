<script>
import axios from 'axios';
import { store } from '../../store.js';
import SearchBar from '../../components/SearchBar.vue';
import FilterSearchBar from '../FilterSearchBar.vue';
import ApartmentCard from '../ApartmentCard.vue';

export default {

  name: 'SearchPage',

  data() {
    return {
      baseApiUrl: 'http://127.0.0.1:8000/api/',
      store,
      loading: false, // Stato per gestire il loader
    }

  },

  components: {
    SearchBar,
    FilterSearchBar,
    ApartmentCard
  },

  mounted() {
    this.fetchApartments(); // Chiamata API per ottenere gli appartamenti
  },

  methods: {
    fetchApartments() {
      this.loading = true; // Mostra il loader
      console.log('Loading is set to true');
      axios.get(this.baseApiUrl, {
        params: { /* parametri di ricerca */ }
      })
        .then(res => {
          // Memorizza i risultati degli appartamenti nello store
          this.store.apartments = res.data.results;
          console.log('Apartments loaded successfully');
        })
        .finally(() => {
          this.loading = false; // Nasconde il loader
          console.log('Loading is set to false');
        });
    }
  }
}
</script>

<template>
  <div id="app" class="container mt-5">
    <div id="search-bar">
      <SearchBar></SearchBar>
      <FilterSearchBar></FilterSearchBar>
    </div>

    <div v-if="loading" class="loader"></div>
    <div v-else class="row row-gap-5 gap-4 justify-content-center pb-4 mt-1 mb-5">
      <ApartmentCard class="col-12 col-sm-6 col-md-4 col-lg-3" 
      v-for="currentApartment in store.apartments"
        :apartment="currentApartment" 
        :showDistance="true" 
        :key="currentApartment.slug"></ApartmentCard>
    </div>
  </div>
</template>


<style lang="scss" scoped>
#search-bar {
  width: auto;
  bottom: 0px;
}

.card {
  height: 250px; // Altezza ridotta
  background-color: #ffffff;
  border-radius: 30px; // Bordo arrotondato ridotto
  overflow: hidden;
}

.card-cover {
  position: relative;
}

.distance {
  display: inline-block;

  padding: 2px 4px;

  border-radius: 4px;

  background-color: #3f8d8e;

  position: absolute;
  top: 10px;
  left: 20px;

  font-size: .7em;
  color: white;
}

.card-img-top {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.card-img-overlay {
  height: 100%;
  width: 100%;
  top: 0;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.overlay {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.261), rgba(67, 64, 64, 0));

  height: 50%; // Occupa metà altezza
  color: #ffffff;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.card-title {
  font-weight: lighter;
  color: #006769c0;
  text-shadow: 1px 1px 2px rgba(39, 37, 37, 0.628);
}

.apartment-details {
  display: none;
}



.card:hover .card-img-top {
  transform: scale(1.1);
}

.card:hover .card-img-overlay,
.card:hover .overlay {
  opacity: 1;
}



.card:hover .apartment-details {
  display: block;
}

.loader {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;
  margin: 0 auto;
  display: block;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .card {
    height: 200px; // Altezza ridotta per schermi piccoli
  }

  .card-img-top {
    height: 100%;
  }
}
</style>
