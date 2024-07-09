<script>

import tt from '@tomtom-international/web-sdk-maps';
import { store } from '../store';




export default {
    name: 'Map',

    data() {
        return {
            store,
            
        }
    },
    
    components: {
    },
    methods:{
       
    },
    
    mounted(){

        // const center = [12.488259, 41.892630];
        const center = [store.longitudeMap, store.latitudeMap];

        const map = tt.map({
            key: 'vo4DvtQcoR20QZg6FGxev9COwz3jyip2',
            container: 'map',
            center: center   ,
            zoom: 16,
        });

        map.on('load', ()=>{
            new tt.Marker().setLngLat(center).addTo(map)

        });

        
        
    }
}
</script>


<template>
    
    
    <div id="map">

        <!-- qui viene caricata la mappa tramite tom tom -->
          
    </div>




</template>

<style lang="scss" scoped>

#map{
    margin-top: 2em;

    margin-bottom: 3em;

    height: 300px;
    width: 300px ;

    border: 1px solid black;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;;


}



</style>