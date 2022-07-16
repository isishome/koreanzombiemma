import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar, Cookies } from 'quasar'
import { router } from './router'
import { i18n } from './i18n'
import axios from 'axios'
import App from './App.vue'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'


// create axios instance
const instance = axios.create({
  baseURL: '',
  withCredentials: true,
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0'
  }
})

createApp(App).provide('axios', instance).use(router).use(createPinia()).use(i18n).use(Quasar, {
  plugins: {
    Cookies
  }, // import Quasar plugins and add here
}).mount('#app')