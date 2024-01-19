import { createRouter, createWebHashHistory } from "vue-router"
import  Home  from "../pages/Home.vue"
import  Form  from "../pages/Form.vue"
import  Anotation  from "../pages/CreateAnotation.vue"

const routes = [
  { path: '/', component: Home},
  { path: '/form', component: Form},
  { path: '/anotation', component: Anotation},
];



const router = createRouter({
  
  history: createWebHashHistory(),
  routes, 
});

export default router;


