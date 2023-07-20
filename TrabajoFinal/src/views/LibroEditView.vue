<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import useLibros from './../Api/useLibros';
import useAutores from './../Api/useAutores';

const {  
    ObtieneLibroXIdApi, 
    CrearLibroApi,
    ActualizarLibroApi 
} = useLibros();

const {  ObtenerAutoresApi } = useAutores();

const route = useRoute();
const router = useRouter();

const formLibro = ref<any>({});
const autores = ref<any>([]);

onMounted(async () => {
    const id = route.params.id;
    
    if(id!='0'){
        await ObtieneLibroXId(id+'');
    }
    else{
        formLibro.value.id= 0;
        formLibro.value.titulo='';
        formLibro.value.editorial='';
        formLibro.value.anio='';
        formLibro.value.numero_paginas='';
        formLibro.value.autoresId=0;
    }

    await ObtenerAutores();
})


const ObtieneLibroXId = async (id: string)=>{
    
    const resp = await ObtieneLibroXIdApi(+id);
    formLibro.value = resp.data;
}

const GrabarLibro = async ()=>{
    if(formLibro.value.id == '0' || formLibro.value.id == 0){
        const resp = await CrearLibroApi(formLibro.value);
         console.log(resp.data);
    } else{
        const resp = await ActualizarLibroApi(formLibro.value);
        console.log(resp.data);
    }
    // //formAutor.value = 
}

const ObtenerAutores = async ()=>{
    const resp = await ObtenerAutoresApi();
    autores.value = resp.data;
}

</script>
<template>
    <h3>Libro</h3>
    <div class="container">
        <form>
            <div class="mb-3">
                <label for="titulo" class="form-label">Titulo del libro</label>
                <input type="text" class="form-control" id="titulo" v-model="formLibro.titulo">
            </div>
            <div class="mb-3">
                <label for="editorial" class="form-label">Editorial</label>
                <input type="text" class="form-control" id="editorial" v-model="formLibro.editorial">
            </div>
            <div class="mb-3">
                <label for="anio" class="form-label">Año de publicación</label>
                <input type="text" class="form-control" id="anio" v-model="formLibro.anio">
            </div>
            <div class="mb-3">
                <label for="numero_paginas" class="form-label">Número de Paginas</label>
                <input type="text" class="form-control" id="numero_paginas" v-model="formLibro.numero_paginas">
            </div>
            <div class="mb-3">
                <label for="autoresId" class="form-label">Autor</label>
                <select class="form-select" aria-label="autoresId" v-model="formLibro.autoresId">
                    <option v-for="(autor, index) in autores"
                        :value="autor.id"
                        :key="index">
                        {{ autor.nombre }}
                    </option> 
                </select>
            </div>
            
          
            <div class="d-grid gap-2 d-md-flex justify-content-md-star">
                <button class="btn btn-primary me-md-2" type="button" @click="GrabarLibro">Grabar</button>
                <button class="btn btn-danger" type="button" @click="router.push({ name: 'libros'})">Cancelar</button>
            </div>
        </form>
    </div>
</template>
