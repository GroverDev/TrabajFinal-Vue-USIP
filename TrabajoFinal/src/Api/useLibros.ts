import axios from 'axios';

const libroApi = axios.create({
    baseURL: 'http://localhost:3000'
});


const useLibros = () => {
    
    const ObtenerLibrosApi = async () => {
        const respuesta = {
            data: [],
        };

        try {
            const { data } = await libroApi.get(
                'libros?_expand=autores',
                {
                    headers: {
                        'Content-type': 'application/json',
                    }
                }
            );
            respuesta.data = data;
            console.log(data);
            
        } catch (error) {
            console.log(error);
            
        }
        return respuesta;
    }

    const BuscarLibrosApi = async (nombre: string) => {
        const respuesta = {
            data: [],
        };

        try {
            const { data } = await libroApi.get(
                `libros?_expand=autores&titulo_like=${nombre}`,
                {
                    headers: {
                        'Content-type': 'application/json',
                    }
                }
            );
            respuesta.data = data;
            console.log(data);
            
        } catch (error) {
            console.log(error);
            
        }
        return respuesta;
    }

    const ObtieneLibroXIdApi = async (id: number) => {
        const respuesta = {
            data: [],
        };

        try {
            const { data } = await libroApi.get(
                `libros/${id}`,
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
    const CrearLibroApi = async (libro: any) => {
        const respuesta = {
            data: [],
        };
        try {
            const { data } = await libroApi.post(
                `libros`,
                {
                    titulo: libro.titulo,
                    editorial: libro.editorial,
                    anio: libro.anio,
                    numero_paginas: libro.numero_paginas,
                    autoresId: libro.autoresId
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
    const ActualizarLibroApi = async (libro: any) => {
        const respuesta = {
            data: [],
        };
        try {
            const { data } = await libroApi.patch(
                `libros/${libro.id}`,
                {
                    titulo: libro.titulo,
                    editorial: libro.editorial,
                    anio: libro.anio,
                    numero_paginas: libro.numero_paginas,
                    autoresId: libro.autoresId
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
    const EliminarLibroApi = async (id: any) => {
        const respuesta = {
            data: [],
        };
        try {
            const { data } = await libroApi.delete(
                `libros/${id}`,
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
    const FiltarXAnioApi = async (anio: number) => {
        const respuesta = {
            data: [],
        };

        try {
            const { data } = await libroApi.get(
                `libros?_expand=autores`,
                {
                    headers: {
                        'Content-type': 'application/json',
                    }
                }
            );
            let datos = data;
            let datoFilter: any[]=[];
            await datos.forEach((libro:any) => {
                if(libro.anio > anio){
                    datoFilter.push(libro);
                }
            });
            
            respuesta.data = datoFilter as any;
            
        } catch (error) {
            console.log(error);
            
        }
        return respuesta;
    }

    return { 
        ObtenerLibrosApi, 
        BuscarLibrosApi,
        ObtieneLibroXIdApi,
        CrearLibroApi,
        ActualizarLibroApi,
        EliminarLibroApi,
        FiltarXAnioApi
    }
};

export default useLibros;