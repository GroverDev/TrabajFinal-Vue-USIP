<template>
    <div class="container">
      <nav class="navbar navbar-expand-lg mb-4 border-bottom">
        <router-link :to="routes[0].path" class="navbar-brand d-flex align-items-center text-decoration-none">
          <h3>Trabajo final - VueJs - USIP</h3>
        </router-link>
        <button class="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
  
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav ms-auto">
            <div v-for="route in routes[0].children" :key="route.path">
              <li class="nav-item text-uppercase"  v-if="!route.path.includes('/:')">
                <router-link :to="route.path" class="nav-link" :title="route.name"
                  :class="{ active: isActive(route.path) }"  >
                  <i class="bi bi-house-fill" ></i>
                  {{ route.name }}
                </router-link>
              </li>
            </div>
          </ul>
        </div>
      </nav>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { computed } from "vue";
  import { useRouter } from "vue-router";
  import { routes } from "./../router";
  
  
  
  const routers = useRouter();
  const activeRoute = computed(() => routers.currentRoute.value.path);
  const isActive = (path: string) => path === activeRoute.value;
  </script>
  
  <style lang="scss" scoped>
  ul {
    list-style: none;
  }
  .active {
    
    text-decoration: underline;
  }
  </style>
  