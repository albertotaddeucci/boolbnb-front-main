<script>
import axios from 'axios';
import { store } from '../store';

export default {
  name: 'ContactForm',

  data() {
    return {
      store,
      formData: {
        name: '',
        surname: '',
        mail_address: '',
        message: '',
        apartment_id: store.idMessage,
      },
      successMessage: '',
      errorMessage: '', // Proprietà per gestire il messaggio di errore
      loading: false, // Stato per gestire il loader
    }
  },

  methods: {
    sendContactRequest() {
      this.loading = true; // Mostra il loader
      this.successMessage = ''; // Resetta il messaggio di successo
      this.errorMessage = ''; // Resetta il messaggio di errore
      axios.post('http://127.0.0.1:8000/api/new-contact', this.formData)
        .then(res => {
          this.successMessage = 'Messaggio inviato con successo!';
          this.resetForm();
        })
        .catch(error => {
          console.error(error);
          this.errorMessage = 'Si è verificato un errore durante l\'invio del messaggio.';
        })
        .finally(() => {
          this.loading = false; // Nasconde il loader
        });
    },

    resetForm() {
      this.formData = {
        name: '',
        surname: '',
        mail_address: '',
        message: '',
        apartment_id: store.idMessage,
      };
    }
  }
}
</script>

<template>
  <div>
    <div v-if="loading" class="loader"></div> <!-- Loader visibile quando loading è true -->
    <form v-else @submit.prevent="sendContactRequest()">
      <div v-if="successMessage" class="alert alert-success" role="alert">
        {{ successMessage }}
      </div>

      <div v-if="errorMessage" class="alert alert-danger" role="alert">
        {{ errorMessage }}
      </div>

      <div class="mb-3">
        <label for="name" class="form-label">Nome *</label>
        <input type="text" class="form-control" id="name" name="name" v-model="formData.name" required>
      </div>

      <div class="mb-3">
        <label for="surname" class="form-label">Cognome *</label>
        <input type="text" class="form-control" id="surname" name="surname" v-model="formData.surname" required>
      </div>

      <div class="mb-3">
        <label for="mail_address" class="form-label">Indirizzo email *</label>
        <input type="email" class="form-control" id="mail_address" name="mail_address" aria-describedby="emailHelp" v-model="formData.mail_address" required>
        <div id="emailHelp" class="form-text">Non condivideremo la tua mail con terzi.</div>
      </div>

      <div class="form-floating mb-3">
        <textarea class="form-control" placeholder="Inserisci il tuo messaggio" id="message" style="height: 200px;" v-model="formData.message" required></textarea>
        <label for="message">Messaggio *</label>
      </div>

      <div>
        <p><small>
          (*)Campo obbligatorio
        </small></p>
      </div>

      <div class="d-flex justify-content-end py-3 pe-5">
        <button type="submit" class="router cta link-be"><strong>Invia</strong><span><i class="fa-solid fa-arrow-right"></i></span></button>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.cta {
  padding-block: 5px;
  padding-inline: 40px;
  border: 2px solid #006769c0;
  border-radius: 10px;

  &:hover {
    background-color: #006769c0;
    color: white;
  }
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
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.alert-danger {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}
</style>