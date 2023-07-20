<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import useAutores from './../Api/useAutores';

const {  
    ObtieneAutorXIdApi, 
    CrearAutorApi,
    ActualizarAutorApi 
} = useAutores();

const route = useRoute();
const router = useRouter();
const formAutor = ref<any>({});


onMounted(async () => {
    const id = route.params.id;
    
    if(id!='0'){
        await ObtieneAutorXId(id+'');
    }
    else{
        formAutor.value.id= 0;
        formAutor.value.nombre='';
        formAutor.value.nacionalidad='';
        formAutor.value.fecha_nacimiento='';
        formAutor.value.genero_literario='';
    }
    
})


const ObtieneAutorXId = async (id: string)=>{
    
    const resp = await ObtieneAutorXIdApi(+id);
    formAutor.value = resp.data;
}

const GrabarAutor = async ()=>{
    if(formAutor.value.id == '0' || formAutor.value.id == 0){
        const resp = await CrearAutorApi(formAutor.value);
         console.log(resp.data);
    } else{
        const resp = await ActualizarAutorApi(formAutor.value);
        console.log(resp.data);
    }
    // //formAutor.value = 
}


</script>
<template>
    <h3>Autor</h3>
    <div class="container">
        <form>
            <div class="mb-3">
                <label for="nombre" class="form-label">Nombre del Autor</label>
                <input type="text" class="form-control" id="nombre" v-model="formAutor.nombre">
            </div>
            <div class="mb-3">
                <label for="nacionalidad" class="form-label">Nacionalidad</label>
                <input type="text" class="form-control" id="nacionalidad" v-model="formAutor.nacionalidad">
            </div>
            <div class="mb-3">
                <label for="fecha_nacimiento" class="form-label">Fecha Nacimiento</label>
                <input type="text" class="form-control" id="fecha_nacimiento" v-model="formAutor.fecha_nacimiento">
            </div>
            <div class="mb-3">
                <label for="genero_literario" class="form-label">Genero Literario</label>
                <input type="text" class="form-control" id="genero_literario" v-model="formAutor.genero_literario">
            </div>
          
            <div class="d-grid gap-2 d-md-flex justify-content-md-star">
                <button class="btn btn-primary me-md-2" type="button" @click="GrabarAutor">Grabar</button>
                <button class="btn btn-danger" type="button" @click="router.push({ name: 'autores'})">Cancelar</button>
            </div>
        </form>
    </div>
</template>