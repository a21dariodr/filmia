import axios from 'axios'
import { Film, ProductionCompany, ProductionCountry } from '../../models/Film';

// Servicio para la obtención de datos de películas de la API The Movie Database
export default class TheMovieDatabaseApiService {
    readonly tmdApiAccessToken = import.meta.env.VITE_TMD_ACCESS_TOKEN
    readonly baseUrl = 'https://api.themoviedb.org/3/'
    readonly imageBaseUrl = 'https://image.tmdb.org/t/p/'
    readonly appendToResponse = '&append_to_response='
    readonly imageSizes = ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original']

    private optionsGetFilm = {
        method: 'GET',
        url: '',
        params: {
            include_adult: 'false',
            language: 'es-ES',
        },
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + this.tmdApiAccessToken
        }
    }

    private optionsSearchFilm = {
        method: 'GET',
        url: this.baseUrl + 'search/movie',
        params: {
            query: '',
            include_adult: 'false',
            language: 'es-ES',
            page: '1'
        },
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + this.tmdApiAccessToken
        }
    }

    public async getMovieById(id: string) {
        let options = { ...this.optionsGetFilm }
        options.url = this.baseUrl + 'movie/' + id

        const filmInfo: any = await axios.request(options)
        const film: Film = this.movieGetByIdMapper(filmInfo.data)

        return film
    }

    public async searchMovieByTitle(titleQuery: string) {
        let options = { ...this.optionsSearchFilm }
        options.params.query = titleQuery

        const response: any = await axios.request(options)
        const searchResult = response.data.results
        const filmsFound: Film[] = this.movieSearchByTitleMapper(searchResult)

        return filmsFound
    }

    private movieGetByIdMapper(filmInfo: any): Film {
        const posterUrl = this.imageBaseUrl + this.imageSizes[4] + filmInfo.poster_path

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

        if (searchResult) {
            searchResult.forEach((filmResult: any) => {
                let posterUrl: string
                if (filmResult.poster_path) posterUrl = this.imageBaseUrl + this.imageSizes[2] + filmResult.poster_path
                else posterUrl = ''

                const film = new Film(filmResult.id, filmResult.title, filmResult.original_title, filmResult.release_date, posterUrl, filmResult.vote_average)
                filmsFound.push(film)
            })
        }
        return filmsFound
    }

    private filmGenresMapper(genresResult: any): string[] {
        const genres: string[] = genresResult.map((genre: any) => genre.name)
        return genres
    }

    private filmProductionCountriesMapper(productionCountriesResult: any): ProductionCountry[] {
        const productionCountries: ProductionCountry[] = productionCountriesResult.map((productionCountry: any): ProductionCountry => {
            return { name: productionCountry.name, iso3166: productionCountry.iso_3166_1 }
        })
        return productionCountries
    }

    private filmProductionCompaniesMapper(productionCompaniesResult: any): ProductionCompany[] {
        const productionCompanies: ProductionCompany[] = productionCompaniesResult.map((productionCompany: any): ProductionCompany => {
            return { name: productionCompany.name, originCountry: productionCompany.origin_country, logoUrl: this.baseUrl + this.imageSizes[2] + productionCompany.logo_path }
        })

        return productionCompanies
    }
}
