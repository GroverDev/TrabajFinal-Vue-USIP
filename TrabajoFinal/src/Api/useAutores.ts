import axios from 'axios';

const autorApi = axios.create({
    baseURL: 'http://localhost:3000'
});


const useAutores = () => {
    
    const ObtenerAutoresApi = async () => {
        const respuesta = {
            data: [],
        };

        try {
            const { data } = await autorApi.get(
                'autores/',
                {
                    headers: {
                        'Content-type': 'application/json',
                    }
                }
            );
            respuesta.data = data;
        } catch (error) {
            console.log(error);
        }
        return respuesta;
    }

    const BuscarAutoresApi = async (nombre: string) => {
        console.log(nombre);
        const respuesta = {
            data: [],
        };

        try {
            const { data } = await autorApi.get(
                `autores?nombre_like=${nombre}`,
                {
                    headers: {
                        'Content-type': 'application/json',
                    }
                }
            );
            respuesta.data = data;
        } catch (error) {
            console.log(error);
        }
        return respuesta;
    }

    const ObtieneAutorXIdApi = async (id: number) => {
        const respuesta = {
            data: [],
        };

        try {
            const { data } = await autorApi.get(
                `autores/${id}`,
                {
                    headers: {
                        'Content-type': 'application/json',
                    }
                }
            );
            respuesta.data = data;
        } catch (error) {
            console.log(error);
        }
        return respuesta;
    }
    const CrearAutorApi = async (autor: any) => {
        const respuesta = {
            data: [],
        };
        try {
            const { data } = await autorApi.post(
                `autores`,
                {
                    nombre: autor.nombre,
                    nacionalidad: autor.nacionalidad,
                    fecha_nacimiento: autor.fecha_nacimiento,
                    genero_literario: autor.genero_literario
                },
                {
                    headers: {
                        'Content-type': 'application/json',
                    }
                }
            );
            respuesta.data = data;
        } catch (error) {
            console.log(error);
        }
        return respuesta;
    }
    const ActualizarAutorApi = async (autor: any) => {
        const respuesta = {
            data: [],
        };
        try {
            const { data } = await autorApi.patch(
                `autores/${autor.id}`,
                {
                    nombre: autor.nombre,
                    nacionalidad: autor.nacionalidad,
                    fecha_nacimiento: autor.fecha_nacimiento,
                    genero_literario: autor.genero_literario
                },
                {
                    headers: {
                        'Content-type': 'application/json',
                    }
                }
            );
            respuesta.data = data;
        } catch (error) {
            console.log(error);
        }
        return respuesta;
    }
    const EliminarAutorApi = async (id: any) => {
        const respuesta = {
            data: [],
        };
        try {
            const { data } = await autorApi.delete(
                `autores/${id}`,
                {
                    headers: {
                        'Content-type': 'application/json',
                    }
                }
            );
            respuesta.data = data;
        } catch (error) {
            console.log(error);
        }
        return respuesta;
    }

    return { 
        ObtenerAutoresApi, 
        BuscarAutoresApi, 
        ObtieneAutorXIdApi, 
        CrearAutorApi,
        ActualizarAutorApi,
        EliminarAutorApi
    }
};

export default useAutores;