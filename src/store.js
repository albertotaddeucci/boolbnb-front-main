import { reactive } from 'vue';

// Definire uno store reattivo per mantenere lo stato dell'applicazione
export const store = reactive({
  inputSearch: '', // Input dell'utente per la ricerca
  addresses: [], // Indirizzi suggeriti dall'API di TomTom
  apartmentsAddress: [], // Appartamenti trovati vicino all'indirizzo
  apartments: [], // Lista di appartamenti trovati tramite la ricerca

  sponsoredApartments: '',

  //per il filtro
  latitude: null,
  longitude: null,

  //per prendere l'id dell'appartamento a cui mandare il messaggio
  idMessage: '',
  ipAddress: '',


  //lat e lon per coordinate mappa
  latitudeMap: null,
  longitudeMap: null,


  inputRooms: '',
  inputBeds: '',
  inputBathrooms: '',
  inputSquaredMeters: '',
  services: []
});
