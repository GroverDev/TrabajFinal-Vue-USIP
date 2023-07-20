<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Modal } from "bootstrap";

import useAutores from './../Api/useAutores';

const router = useRouter();
const {  ObtenerAutoresApi, BuscarAutoresApi, EliminarAutorApi } = useAutores();

const autores = ref<any>([]);

const formBuscar = ref({
    texto: ''
});
const infoModal = ref();
const modal     = ref();
const idSeleccionado     = ref();

onMounted(() => {
    ObtenerAutores();
    modal.value = new Modal(infoModal.value);
})

const ObtenerAutores = async ()=>{
    
    const resp = await ObtenerAutoresApi();
    autores.value = resp.data;
}
const BuscarAutores = async()=>{
    
    const resp = await BuscarAutoresApi(formBuscar.value.texto);
    
    autores.value = resp.data;
}
const AgregarAutor = ()=>{
    router.push({ name: "autores-edit", params: { id: 0} });
}
const EditarAutor = (id: number)=>{
    router.push({ name: "autores-edit", params: { id: id} });
}
const PreguntaEliminarAutor = (id: number)=>{
    idSeleccionado.value = id;
    modal.value.show();
}
const EliminarAutor = async ()=>{
    modal.value.hide();
    await EliminarAutorApi(idSeleccionado.value);
    idSeleccionado.value = 0;
    BuscarAutores();
}
</script>
<template>
    <div class="container">
        <h4>Autores</h4>
        <hr>
        <form v-on:submit.prevent="BuscarAutores">
            <label class="mr-2">Filtra por autor</label>
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Ingrese nombre de autor" aria-label="Ingrese nombre de autor" 
                    aria-describedby="button-addon2" v-model="formBuscar.texto" >
                <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="BuscarAutores">Buscar</button>
            </div>
        </form>
<hr>
        <button type="button" class="btn btn-primary mt-3" @click="AgregarAutor">Agregar Autor</button>
        <table class="table table-striped  ">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Nacionalidad</th>
                            <th>Fecha Nacimiento</th>
                            <th>Genero Literario</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="(autor, index) in autores" :key="index">
                            <td> {{autor.nombre}} </td>
                            <td> {{autor.nacionalidad}} </td>
                            <td> {{autor.fecha_nacimiento}} </td>
                            <td> {{autor.genero_literario}} </td>
                            <td>
                                <button class="btn btn-primary me-md-2 btn-sm" type="button" @click="EditarAutor(autor.id)" >Editar</button>
                                &nbsp;
                                <button class="btn btn-danger me-md-2 btn-sm" type="button" @click="PreguntaEliminarAutor(autor.id)" >Borrar</button>
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
                <button  class="btn btn-primary " @click="EliminarAutor">Aceptar </button>
                <button type="button" class="btn btn-danger" @click="modal.hide()">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</template>