import axios from 'axios'
import { Film, ProductionCompany, ProductionCountry } from '../../models/Film';

// Servicio para la obtención de datos de películas de la API The Movie Database
export default class TheMovieDatabaseApiService {
    readonly tmdApiAccessToken = import.meta.env.VITE_TMD_ACCESS_TOKEN
    readonly baseUrl = 'https://api.themoviedb.org/3/'
    readonly imageBaseUrl = 'https://image.tmdb.org/t/p/'
    readonly appendToResponse = '&append_to_response='
    readonly imageSizes = ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original']

    private options = {
        method: 'GET',
        url: '',
        params: {
            query: '',
            include_adult: '',
            language: 'es-ES',
            page: ''
        },
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + this.tmdApiAccessToken
        }
    }

    public async getMovieById(id: string) {
        let options = { ...this.options }
        options.url = this.baseUrl + 'movie/' + id

        const filmInfo: any = await axios.request(options)
        const film: Film = this.movieGetByIdMapper(filmInfo)

        return film
    }

    public async searchMovieByTitle(titleQuery: string) {
        let options = { ...this.options }
        options.url = this.baseUrl + 'search/movie'
        options.params.query = titleQuery
        options.params.page = '1'
        options.params.include_adult = 'true'

        const response: any = await axios.request(options)
        const searchResult = response.results
        const filmsFound: Film[] = this.movieSearchByTitleMapper(searchResult)

        return filmsFound
    }

    private movieGetByIdMapper(filmInfo: any): Film {
        const posterUrl = this.baseUrl + this.imageSizes[4] + filmInfo.poster_path

        const film: Film = new Film(filmInfo.id, filmInfo.title, filmInfo.original_title, filmInfo.release_date, posterUrl, filmInfo.vote_average)

        film.originalLanguage = filmInfo.original_language
        film.duration = filmInfo.runtime
        film.genres = this.filmGenresMapper(filmInfo.genres)
        film.overview = filmInfo.overview
        film.productionCountries = this.filmProductionCountriesMapper(filmInfo.production_countries)
		film.productionCompanies = this.filmProductionCompaniesMapper(filmInfo.production_companies)
		film.revenue = filmInfo.revenue
        film.popularity = filmInfo.popularity
        film.tagLine = filmInfo.tagline

        return film
    }

    private movieSearchByTitleMapper(searchResult: any): Film[] {
        const filmsFound: Film[] = []

        searchResult.forEach((filmResult: any) => {
            const posterUrl = this.baseUrl + this.imageSizes[2] + filmResult.poster_path
            const film = new Film(searchResult.id, searchResult.title, searchResult.original_title, searchResult.release_date, posterUrl, searchResult.vote_average)
            filmsFound.push(film)
        })

        return filmsFound
    }

    private filmGenresMapper(genresResult: any): string[] {
        const genres: string[] = genresResult.map((genre: any) => genre.name)
        return genres
    }

    private filmProductionCountriesMapper(productionCountriesResult: any): ProductionCountry[] {
		const productionCountries: ProductionCountry[] = productionCountriesResult.map( (productionCountry: any): ProductionCountry => {
			return { name: productionCountry.name, iso3166: productionCountry.iso_3166_1 }
		} )
		return productionCountries
	}

    private filmProductionCompaniesMapper(productionCompaniesResult: any): ProductionCompany[] {
		const productionCompanies: ProductionCompany[] = productionCompaniesResult.map( (productionCompany: any): ProductionCompany => {
			return { name: productionCompany.name,
				originCountry: productionCompany.origin_country,
				logoUrl: this.baseUrl + this.imageSizes[2] + productionCompany.logo_path }
		})

		return productionCompanies
	}
}
