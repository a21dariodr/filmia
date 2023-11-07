import axios from 'axios'

//TODO implementar métodos del servicio
// Servicio para la obtención de datos de películas de la API The Movie Database
export default class TheMovieDatabaseApiService {
    readonly tmdApiAccessToken = import.meta.env.VITE_TMD_ACCESS_TOKEN
    readonly baseUrl = 'https://api.themoviedb.org/3/'
    readonly imageBaseUrl = 'http://image.tmdb.org/t/p/'
    readonly appendToResponse = '&append_to_response='

    options = {
        method: 'GET',
        url: '',
        params: {
            query: '',
            include_adult: 'true',
            language: 'es',
            page: '1'
        },
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + this.tmdApiAccessToken
        }
    }

    public getMovieById() {
        //TODO implementar método
        if (!axios) console.log('Llamada a la API de TMD')
    }

	//TODO añadir procesamiento para crear objetos Film con la info y devolverlos en un array
    public searchMovieByTitle(titleQuery: string) {
        let options = { ...this.options }
        options.url = this.baseUrl + '/search/movie'
		options.params.query = titleQuery
		return axios.request(options)
    }
}
