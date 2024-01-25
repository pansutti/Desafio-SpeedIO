import { createRouter, createWebHashHistory } from "vue-router"
import  Home  from "../pages/Home.vue"
import  Form  from "../pages/Form.vue"
import  Anotation  from "../pages/Anotations.vue"
import EditAnotationForm from '../pages/EditAnotationForm.vue';
const routes = [
  { path: '/', component: Home},
  { path: '/form', component: Form},
  { path: '/anotation', component: Anotation},
  { path: '/edit/:id', component: EditAnotationForm, name: 'editAnotationForm' },
];



const router = createRouter({
  
  history: createWebHashHistory(),
  routes, 
});

export default router;


