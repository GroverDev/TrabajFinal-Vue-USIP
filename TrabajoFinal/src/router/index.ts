import { createRouter, createWebHistory } from 'vue-router'

import Default from './../layouts/DefaultLayout.vue'
import HomeView from  './../views/HomeView.vue';
import LibroView from  './../views/LibroView.vue';
import LibroEditView from  './../views/LibroEditView.vue';
import AutorView from  './../views/AutorView.vue';
import AutorEditView from  './../views/AutorEditView.vue';

export const routes = [
  {
    path: '/',
    component: Default,
    redirect:'/home',
    children:[
      {
          path:'/home',
          name:'home',
          component: HomeView
      },
      {
          path:'/libros',
          name:'libros',
          component: LibroView
      },
      {
        path:'/autores',
        name:'autores',
        component: AutorView
      },
      {
        path:'/autores/:id',
        name:'autores-edit',
        component: AutorEditView,
      },
      {
        path:'/libros/:id',
        name:'libros-edit',
        component: LibroEditView,
      }
    ]
  },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

