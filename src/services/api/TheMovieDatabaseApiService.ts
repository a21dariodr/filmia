import axios from 'axios'

//TODO implementar métodos del servicio
// Servicio para la obtención de datos de películas de la API The Movie Database
export default class TheMovieDatabaseApiService {
	
    tmdApiKey = import.meta.env.VITE_TMD_ACCESS_TOKEN

    public getMovieInfo() {
        //TODO implementar método
        if (!axios) console.log("Llamada a la API de TMD")
    }
}