// Type for actors
export type Actor = {
	name: string
	profilePath: string
}

// Type for crew members like directors and writers
export type CrewMember = {
    name: string
    profilePath: string
	job: string
}

// Type for production companies
export type ProductionCompany = {
	name: string
	logoUrl: string
	originCountry: string
}

// Type for production contries
export type ProductionCountry = {
    name: string
    iso3166: string
}

// Type for watch providers
export type WatchProvider = {
	name: string,
	logoUrl: string
}

// Class for manage all of the data about a movie
export class Film {
    private _id: number
    private _title: string
    private _originalTitle: string
    private _originalLanguage?: string | null
    private _duration?: number | null
    private _releaseYear: number
    private _genres?: string[] | null
    private _overview?: string | null
    private _posterPath: string
    private _productionCountries?: ProductionCountry[] | null
    private _productionCompanies?: ProductionCompany[] | null
    private _voteAverage: number
    private _revenue?: number | null
    private _popularity?: number | null
    private _tagLine?: string | null
    private _score?: number | null
    private _watched?: boolean
    private _cast?: Actor[] | null
    private _crew?: CrewMember[] | null
    private _watchProviders?: WatchProvider[] | null

    /* Constructor with mandatory fields returned when searching films
	 * The rest of the parameters are used through getters and setters
     */
    constructor(id: number, title: string, originalTitle: string, releseaseYear: number, posterPath: string, voteAverage: number) {
        this._id = id
        this._title = title
        this._originalTitle = originalTitle
        this._releaseYear = releseaseYear
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

    public get originalLanguage(): string | undefined | null {
        return this._originalLanguage
    }
    public set originalLanguage(value: string | undefined | null) {
        this._originalLanguage = value
    }

    public get duration(): number | undefined | null {
        return this._duration
    }
    public set duration(value: number | undefined | null) {
        this._duration = value
    }

    public get releaseYear(): number {
        return this._releaseYear
    }
    public set releaseYear(value: number) {
        this._releaseYear = value
    }

    public get genres(): string[] | undefined | null {
        return this._genres
    }
    public set genres(value: string[] | undefined | null) {
        this._genres = value
    }

    public get overview(): string | undefined | null {
        return this._overview
    }
    public set overview(value: string | undefined | null) {
        this._overview = value
    }

    public get posterPath(): string {
        return this._posterPath
    }
    public set posterPath(value: string) {
        this._posterPath = value
    }

    public get productionCountries(): ProductionCountry[] | undefined | null {
        return this._productionCountries
    }
    public set productionCountries(value: ProductionCountry[] | undefined | null) {
        this._productionCountries = value
    }

    public get productionCompanies(): ProductionCompany[] | undefined | null {
        return this._productionCompanies
    }
    public set productionCompanies(value: ProductionCompany[] | undefined | null) {
        this._productionCompanies = value
    }

    public get voteAverage(): number {
        return this._voteAverage
    }
    public set voteAverage(value: number) {
        this._voteAverage = value
    }

    public get revenue(): number | undefined | null {
        return this._revenue
    }
    public set revenue(value: number | undefined | null) {
        this._revenue = value
    }

    public get popularity(): number | undefined | null {
        return this._popularity
    }
    public set popularity(value: number | undefined | null) {
        this._popularity = value
    }

    public get tagLine(): string | undefined | null {
        return this._tagLine
    }
    public set tagLine(value: string | undefined | null) {
        this._tagLine = value
    }

    public get score(): number | undefined | null {
        return this._score
    }
    public set score(value: number | undefined | null) {
        this._score = value
    }

    public get watched(): boolean | undefined {
        return this._watched
    }
    public set watched(value: boolean | undefined) {
        this._watched = value
    }

    public get cast(): Actor[] | undefined | null {
        return this._cast
    }
    public set cast(value: Actor[] | undefined | null) {
        this._cast = value
    }

    public get crew(): CrewMember[] | undefined | null {
        return this._crew
    }
    public set crew(value: CrewMember[] | undefined | null) {
        this._crew = value
    }

    public get watchProviders(): WatchProvider[] | undefined | null {
        return this._watchProviders
    }
    public set watchProviders(value: WatchProvider[] | undefined | null) {
        this._watchProviders = value
    }
}
