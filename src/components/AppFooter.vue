<script>
export default {
    name: 'AppFooter',

    data() {
        return {
            servizios: [
                "Autonoleggio",
                "Escursioni",
                "Ricerca Voli",
                "Ricerca Ristoranti",
                "Agevolazioni Vacanze"
            ],

            emails: [
                "andrealivornese@gmail.com",
                "alberto.taddeucci@gmail.com",
                "alessandrodelcampo@gmail.com",
                "trapassogiuseppe158@gmail.com",
                "pool.gutierrezv@gmail.com"
            ],

            socials: [
                "fa-facebook",
                "fa-x-twitter",
                "fa-instagram",
                "fa-google-plus-g",
                "fa-tiktok",
                "fa-youtube"
            ]
        }
    }
}
</script>


<template>

    <footer>
        <div class="container py-5">
            
            <div class="row row-gap-4">
                <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div class="col-title text-center text-md-start">
                        <span>Servizi</span>
                    </div>
        
                    <div class="components text-center text-md-start">
                        <ul>
                            <li v-for="servizio in servizios">
                                <div class="name">
                                    {{ servizio }}
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>
                <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div class="col-title text-center text-md-start">
                       <span>Contatti</span>
                    </div>
        
                    <div class="components text-center text-md-start">
                        <ul>
                            <li v-for="email in emails">
                                {{ email }}
                            </li>
                        </ul>
                    </div>

                </div>
                <div class="col-12 col-md-4 col-lg-6">
                    <div class="d-flex flex-column ">
                        <div class="col-title text-center">
                            <span>Social</span>
                        </div>
        
                        <div id="social-grid">
                            <div v-for="social in socials" class="icon">
                                <i class="fa-brands" :class="social"></i>
                            </div>
        
                        </div>
                    </div>

                </div>
            </div>

            
        </div>

        <hr>

        <div class="container py-4">
            <h6 class="text-center mb-3">
                Progetto finale di gruppo Boolean®, <span style="color: #006769c0;">BoolBnB</span>.
            </h6>

            <div id="copyright">
                Copyright© 2024, Boolean®.
            </div>
        </div>

    </footer>

</template>

<style lang="scss" scoped>

footer {
    background-color: whitesmoke;
}

#footer-title {
    font-size: 1.6em;
    font-weight: bold;
    text-align: center;

    margin-bottom: 36px;
    color: #006769c0;

    
}

#social-grid {
    max-width: 200px;
    margin: auto;

    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;

    .icon {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 50px;
        height: 50px;

        border: 2px solid #006769c0;

        font-size: 1.3em;

        transition: all .2s ease-in-out;
        
    }

    .icon:hover {
        background-color: #006769c0;
        color: white;
        cursor: pointer;
    }

}

#copyright {
    text-align: center;
    font-weight: bold;
    font-size: .7em;
    opacity: .8;
}

.col-title {
    font-size: 1.6em;
    font-weight: 600;

    margin-bottom: 30px;
    span{
        position: relative;

        &::before{
    
            content: "";
                position: absolute;
                bottom: -10px;
                left: 0;
                width: 50px;
                border-bottom: 3px solid #006769c0;
        }
    }

    
}

.components {
    li {
        font-size: 1.2em;

        a {
            color: white;
            text-decoration: none;
        }
    }
}

ul {
    margin: 0;
    padding: 0;

    display: flex;
    flex-direction: column;
    
    row-gap: 5px;

    font-size: .8em;
    list-style-type: none;
    opacity: .8;
}

hr {
    border-top: 2px solid #006769c0;
}

</style>

