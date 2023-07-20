<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Modal } from "bootstrap";

import useLibros from './../Api/useLibros';

const router = useRouter();
const {  
    ObtenerLibrosApi, 
    BuscarLibrosApi, 
    EliminarLibroApi ,
    FiltarXAnioApi
} = useLibros();

const libros = ref<any>([]);

const formBuscar = ref({
    texto: '',
    anio: 2000
});
const infoModal = ref();
const modal     = ref();
const idSeleccionado     = ref();


onMounted(() => {
    ObtenerLibros();
    modal.value = new Modal(infoModal.value);
})

const ObtenerLibros = async ()=>{
    
    const resp = await ObtenerLibrosApi();
    libros.value = resp.data;
}

const BuscarLibros = async()=>{
    const resp = await BuscarLibrosApi(formBuscar.value.texto);
    libros.value = resp.data;
}

const FiltarXanio = async()=>{
    const resp = await FiltarXAnioApi(formBuscar.value.anio);
    libros.value = resp.data;
}

const AgregarLibro = ()=>{
    router.push({ name: "libros-edit", params: { id: 0} });
}

const EditaLibro = (id: number)=>{
    router.push({ name: "libros-edit", params: { id: id} });
}

const PreguntaEliminarLibro = (id: number)=>{
    idSeleccionado.value = id;
    modal.value.show();
}

const EliminarLibro = async ()=>{
    modal.value.hide();
    await EliminarLibroApi(idSeleccionado.value);
    idSeleccionado.value = 0;
    BuscarLibros();
}
</script>
<template>
    <div class="container">
        <h4>Libros</h4>
        <hr>
        <form v-on:submit.prevent="BuscarLibros">
            <label class="mr-2">Buscar por nombre</label>
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Ingrese el nombre del libro a buscar" aria-label="ngrese el nombre del libro a buscar" 
                aria-describedby="button-addon2" v-model="formBuscar.texto">
                <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="BuscarLibros">Buscar</button>
            </div>
        </form>
    <hr>
    </div>
    <div class="container">
        <form v-on:submit.prevent="BuscarLibros">
            <label class="mr-2">Filtrar Libros Mayor a un año</label>
            <div class="input-group mb-3">
                <input type="number" class="form-control" placeholder="Ingrese el año minimo a buscar" 
                aria-describedby="button-addon2" v-model="formBuscar.anio">
                <button class="btn btn-outline-secondary" type="button" id="button-addon3" @click="FiltarXanio">Filtrar</button>
            </div>
        </form>
<button type="button" class="btn btn-primary mt-3" @click="AgregarLibro">Agregar Libro</button>
        <table class="table table-striped ">
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Autor</th>
                            <th>Editorial</th>
                            <th>Año</th>
                            <th>Nro. Paginas</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="(libro, index) in libros" :key="index">
                            <td> {{libro.titulo}}</td>
                            <td> {{libro.autores.nombre}}</td>
                            <td> {{libro.editorial}}</td>
                            <td> {{libro.anio}}</td>
                            <td> {{libro.numero_paginas}}</td>
                            <td>
                                <button class="btn btn-primary me-md-2 btn-sm" type="button" @click="EditaLibro(libro.id)" >Editar</button>
                                &nbsp;
                                <button class="btn btn-danger me-md-2 btn-sm" type="button" @click="PreguntaEliminarLibro(libro.id)" >Borrar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
    </div>

    <div class="modal fade" ref="infoModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                <h5 id="infoModalLabel">¡Atención!</h5>
                <button type="button" class="btn-close" @click="modal.hide()" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ¿Esta seguro de eliminar el registro?
                </div>
                <div class="modal-footer">
                <button  class="btn btn-primary " @click="EliminarLibro">Aceptar </button>
                <button type="button" class="btn btn-danger" @click="modal.hide()">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</template>