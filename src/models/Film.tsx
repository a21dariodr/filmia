export type ProductionCompany = {
	name: string
	logoUrl: string
	originCountry: string
}

export type ProductionCountry = {
    name: string
    iso3166: string
}

/* Clase para mapear los resultados de consultas a la API de TMDB, que puede ser muy útil para un posible
 * guardado de películas en Firestore
 */
export class Film {
    private _id: number
    private _title: string
    private _originalTitle: string
    private _originalLanguage?: string
    private _duration?: number
    private _releaseYear: string
    private _genres?: string[]
    private _overview?: string
    private _posterPath: string
    private _productionCountries?: ProductionCountry[]
    private _productionCompanies?: ProductionCompany[]
    private _voteAverage: number
    private _revenue?: number
    private _popularity?: number
    private _tagLine?: string

    /* Constructor con parámetros obligatorios usados en la búsqueda de películas
     * Los demás parámetros de emplean a través de los getters y setters
     */
    constructor(id: number, title: string, originalTitle: string, releseaseDate: string, posterPath: string, voteAverage: number) {
        this._id = id
        this._title = title
        this._originalTitle = originalTitle
        this._releaseYear = releseaseDate.substring(0, 4)
        this._posterPath = posterPath
        this._voteAverage = voteAverage
    }

    public get id(): number {
        return this._id
    }
    public set id(value: number) {
        this._id = value
    }

    public get title(): string {
        return this._title
    }
    public set title(value: string) {
        this._title = value
    }

    public get originalTitle(): string {
        return this._originalTitle
    }
    public set originalTitle(value: string) {
        this._originalTitle = value
    }

    public get originalLanguage(): string | undefined {
        return this._originalLanguage
    }
    public set originalLanguage(value: string | undefined) {
        this._originalLanguage = value
    }

    public get duration(): number | undefined {
        return this._duration
    }
    public set duration(value: number | undefined) {
        this._duration = value
    }

    public get releaseYear(): string {
        return this._releaseYear
    }
    public set releaseYear(value: string) {
        this._releaseYear = value
    }

    public get genres(): string[] | undefined {
        return this._genres
    }
    public set genres(value: string[] | undefined) {
        this._genres = value
    }

    public get overview(): string | undefined {
        return this._overview
    }
    public set overview(value: string | undefined) {
        this._overview = value
    }

    public get posterPath(): string {
        return this._posterPath
    }
    public set posterPath(value: string) {
        this._posterPath = value
    }

    public get productionCountries(): ProductionCountry[] | undefined {
        return this._productionCountries
    }
    public set productionCountries(value: ProductionCountry[] | undefined) {
        this._productionCountries = value
    }

    public get productionCompanies(): ProductionCompany[] | undefined {
        return this._productionCompanies
    }
    public set productionCompanies(value: ProductionCompany[] | undefined) {
        this._productionCompanies = value
    }

    public get voteAverage(): number {
        return this._voteAverage
    }
    public set voteAverage(value: number) {
        this._voteAverage = value
    }

    public get revenue(): number | undefined {
        return this._revenue
    }
    public set revenue(value: number | undefined) {
        this._revenue = value
    }

    public get popularity(): number | undefined {
        return this._popularity
    }
    public set popularity(value: number | undefined) {
        this._popularity = value
    }

    public get tagLine(): string | undefined {
        return this._tagLine
    }
    public set tagLine(value: string | undefined) {
        this._tagLine = value
    }
}
