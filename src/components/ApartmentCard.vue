<script>
import { store } from '../store.js';

export default {
  name: 'ApartmentCard',

  props: {
    apartment: Object,
    showDistance: Boolean,
  },

  data() {
    return {
      store,
    };
  },

  methods: {
    catchId(id) {
      store.idMessage = '';
      store.idMessage = id;
    },
    handlePopState() {
      // Forza il refresh della pagina quando si torna indietro utilizzando la freccia del browser
      location.reload();
    },
  },

  mounted() {
    console.log('vista', store.apartments);
    // Aggiungi un listener per l'evento popstate per gestire il ritorno indietro del browser
    window.addEventListener('popstate', this.handlePopState);
  },

  beforeReset() {
    // Rimuovi il listener per l'evento popstate prima di resettare il componente
    window.removeEventListener('popstate', this.handlePopState);
  },
};
</script>

<template>
  <div class="card-box bg-warning p-0">
  <router-link :to="{ name: 'single-apartment', params: { slug: apartment.slug } }" class=" text-decoration-none" @click="catchId(apartment.id)">
      
      <img :src="apartment.image == null ? '/public/No-Image-Placeholder.svg.png' : 'http://127.0.0.1:8000/storage/' + apartment.image" alt="Listing Image">
      <span v-if="showDistance == true" class="distance"><i class="fa-solid fa-person-walking me-2"></i>{{apartment.distance.toFixed(2)}}km</span>

      <i v-show="apartment.apartment_id != null" class="fa-solid fa-crown sponsor"></i>

      <div class="overlay">
        <div class="d-flex h-100 align-items-end">
          <p class="p-3 text-white font-weight">{{ apartment.address }}</p>
        </div>
      </div>
    
      <h6 class="text-center p-2 my_title">{{ apartment.title }}</h6>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>

.card-box{
  position: relative;
  height: 300px;
  width: 250px;

  border-radius: 10px;

  img{
    width: 100%;
    height: 100%;
    object-fit: cover;

    border-radius: 10px;


  }

  .distance{
    display: inline-block;
  
    position: absolute;
    top: 10px;
    left: 20px;
    
    border-radius: 4px;
    border: 1px solid black;
    
    padding: 2px 16px;
    
    font-size: 0.9em;
    font-weight: bold;
    color:#3f8d8e;
    
    background-color: white;
  }

  .sponsor{
    position:absolute;
    top:0;
    right:0;
    
    transform:  scale(170%) translate(5px, -5px) rotateZ(45deg);

    color:#FFD700;
  }
  
  .overlay {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, rgba(17,43,43,0.885766806722689) 17%, rgba(17,193,173,0) 100%);

    border-radius: 10px;
  
    height: 70%; // Occupa metà altezza
    opacity: 0;
    transition: opacity 0.5s ease;

    
  }

  .my_title{
    color: black;
    text-transform: uppercase;

  }

  &:hover .overlay{
    opacity: 1;
  }

}


// #search-bar {
//     width: auto;
//     bottom: 0px;
// }

// .card {
//   width: 230px;
//   height: 350px; // Altezza ridotta
//   background-color: #ffffff;
//   border-radius: 10px; // Bordo arrotondato ridotto
//   overflow: hidden;


//   img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//     transition: transform 0.5s ease;
//   }


// }

// // .card-cover{
// //   position:relative;
// // }




// .card-img-overlay {
//   height: 100%;
//   width: 100%;

//   // z-index: 1;

//   top: 0;
//   opacity: 0;
//   transition: opacity 0.5s ease;
// }


// .card-title {
//   font-weight: lighter;
//   color:#006769c0 ;
//   text-shadow: 1px 1px 2px rgba(39, 37, 37, 0.628);
// }

// .apartment-details {
//   display: none;
// }


// .card:hover .card-img-top {
//   transform: scale(1.1);
// }

// .card:hover .card-img-overlay, .card:hover .overlay {
//   opacity: 1;
// }



// .card:hover .apartment-details {
//   display: block;
// }






</style>