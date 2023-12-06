import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../../state-slices/userSlice'
import filmsReducer from '../../state-slices/filmsSlice'

// Redux store for the app that loads the defined user and films state slices
export const store = configureStore({
    reducer: {
        user: userReducer,
        films: filmsReducer
    },

    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['films/setFilms'],
                // Ignore these field paths in all actions
                ignoredActionPaths: [],
                // Ignore these paths in the state
                ignoredPaths: ['films.filmsList']
            }
        })
})

// Deduces types of `RootState` and `AppDispatch` from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
