import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/index.css'
import router from './routes'

createApp(App).use(router).mount('#app')
