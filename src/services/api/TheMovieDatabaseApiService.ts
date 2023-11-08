import axios from 'axios'

//TODO implementar métodos del servicio
// Servicio para la obtención de datos de películas de la API The Movie Database
export default class TheMovieDatabaseApiService {
    readonly tmdApiAccessToken = import.meta.env.VITE_TMD_ACCESS_TOKEN
    readonly baseUrl = 'https://api.themoviedb.org/3/'
    readonly imageBaseUrl = 'https://image.tmdb.org/t/p/'
    readonly appendToResponse = '&append_to_response='
    readonly imageSizes = ['w92/', 'w154/', 'w185/', 'w342/', 'w500/', 'w780/', 'original/']

    options = {
        method: 'GET',
        url: '',
        params: {
            query: '',
            include_adult: 'true',
            language: 'es',
            page: ''
        },
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + this.tmdApiAccessToken
        }
    }

    //TODO añadir procesamiento paracrear objeto film con la info y devolverlo
	//TODO implementar funcion mapper?
    public async getMovieById(id: string) {
		let options = { ...this.options }
		options.url = this.baseUrl + 'movie/' + id

		const filmInfo = await axios.request(options)
		const film = {}

		return film
    }

    //TODO añadir procesamiento para crear objetos Film con la info y devolverlos en un array
    //TODO añadir url completa de la imagen al objeto
	//TODO implementar función mapper?
    public async searchMovieByTitle(titleQuery: string) {
        let options = { ...this.options }
        options.url = this.baseUrl + 'search/movie'
        options.params.query = titleQuery
		options.params.page = '1'

        const searchResult = await axios.request(options)
		const filmsFound: any = []

		return filmsFound
    }
}
