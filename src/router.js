import { createRouter, createWebHistory } from 'vue-router';

// importazione dei componenti utilizzati come pagina
import HomePage from './components/pages/HomePage.vue';
import SingleApartment from './components/pages/SingleApartment.vue';
import SearchBar from './components/SearchBar.vue';
import SearchPage from './components/pages/SearchPage.vue';
import ContactMe from './components/pages/ContactMe.vue';
import InEvidence from './components/pages/InEvidence.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        //questo array  contiene tutte le rotte  dell' applicazione
        {
            path: '/',
            name: 'HomePage',
            component: HomePage
        },
        {
            path: '/apartments/:slug',
            name: 'single-apartment',
            component: SingleApartment
        },
        {
            path: '/searchpage',
            name: 'SearchPage',
            component: SearchPage
        },
        {
            path: '/apartments/:slug/contact-me',
            name: 'contact-me',
            component: ContactMe
        },
        {
            path: '/inevidence',
            name: 'InEvidence',
            component: InEvidence
        },
       

    ]
});
export { router };