<script>

import SearchBar from '../components/SearchBar.vue';

export default {
    name: 'Jumbo',

    data() {
        return {
            slide: [
                {
                image:"public/jumbo-images/img-3.jpg",
                title:"Un nuovo viaggio ti aspetta",
                text:"Immergiti nella grande varietà di appartamenti disposti su tutto il territorio nazionale. Imposta la posizione e le tue esigenze e scegli l'appartamento per te."
            },
            {
                image:"public/jumbo-images/img-1.jpg",
                title:"Sempre con te per aiutarti",
                text:"Ogni viaggio è un'opportunità per esplorare nuovi luoghi, assaporare cibi unici e incontrare persone affascinanti che possono cambiare il tuo modo di vedere il mondo."
            },
            {
                image:"public/jumbo-images/img-2.jpg",
                title:"Pronto per una nuova avventura?",
                text:"Che tu scelga una spiaggia paradisiaca, una città storica o un sentiero di montagna, ogni destinazione ha qualcosa di speciale da offrire e ti regalerà ricordi che dureranno per sempre."
            },
               
            ],

            slideIndex: 0,
        }
    },
    
    components: {
        SearchBar,
    },
    methods:{
        slideImage(){
            this.slideIndex++;
            if(this.slideIndex==this.slide.length){
                this.slideIndex=0;
            }


        }
    },
    
    mounted(){
        setInterval(this.slideImage, 5000)
        
    }
}
</script>


<template>

    <div v-for="currentSlide,index in slide">

        <div id="jumbo" class="pt-5" :style="{ backgroundImage: 'url(' + currentSlide.image + ')' }" v-show="slideIndex==index">
    
            <div class="container">
                <div class="row">
    
                    <div id="left-side" class="col-6">
            
                        <h1 class="p-3 slide-left text-white" >
                            {{currentSlide.title}}
                        </h1>
                        <p class="p-3 slide-left-r">
                            {{ currentSlide.text }}
                            
                        </p>
                        
                            
                        
                    </div>
                </div>
            </div>        
        </div>
    </div>
    
    <SearchBar class="position-relative z-3"></SearchBar>
    


</template>

<style lang="scss" scoped>


#jumbo{

    position: relative;

    height: 600px;
    
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    
    
    
    &::before{
        content: '';

        position: absolute;
        z-index: 0;

        top: 0;

        width: 100%;
        height: 100%;
        
        background: linear-gradient(90deg, rgba(11,46,46,1) 30%, rgba(17,193,173,0.15467436974789917) 71%);
        opacity: 70%;
        
    }

    .container{

        #left-side{
            position: relative;

            h1 {
                font-size: 3.3em;
                

                &.slide-left {
                    animation: slide-left 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
                }

                @keyframes slide-left {
                    0% {
                                transform: translateX(100px);
                                opacity: 0;
                    }
                    100% {
                                transform: translateX(0px);
                                opacity: 1;

                    }
                }
            }
            
            p {
        
                width: 40ch;
                margin-bottom: 100px;
                font-size: 1em;
                color: rgb(194, 194, 194);

                &.slide-left-r {
                    animation: slide-left 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.1s both;
                }

                @keyframes slide-left-r {
                    0% {
                                transform: translateX(100px);
                                opacity: 0%;
                    }
                    100% {
                                transform: translateX(0px);
                                opacity: 100%;
                    }
                }
                
            }

        }


    }

    

}





</style>