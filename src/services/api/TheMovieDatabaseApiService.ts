import axios from 'axios'

//TODO implementar métodos del servicio
// Servicio para la obtención de datos de películas de la API The Movie Database
export default class TheMovieDatabaseApiService {
    readonly tmdApiKey = import.meta.env.VITE_TMD_ACCESS_TOKEN

    options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer '+this.tmdApiKey
        }
    }

    public getMovieInfo() {
        //TODO implementar método
        if (!axios) console.log('Llamada a la API de TMD')
    }
}
