import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Film } from '../models/Film'

export interface FilmsState {
    filmsList: Film[]
}


const initialState: FilmsState = {
	filmsList: []
}

// State slice for storing the complete list of user films
export const filmsSlice = createSlice({
    name: 'films',
    initialState,
    reducers: {
        setFilms: (state, action: PayloadAction<Film[]>) => {
            state.filmsList = action.payload
        }
    }
})

export const { setFilms } = filmsSlice.actions

export const getFilms = (state: any) => state.films.filmsList

export default filmsSlice.reducer
