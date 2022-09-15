import { createApp } from 'vue'
import store from "./store";
import './assets/css/style.scss'
import './assets/css/tailwind.css'
import App from './App.vue'

createApp(App).use(store).mount('#app')
