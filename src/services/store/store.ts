import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../../state-slices/userSlice'
import filmsReducer from '../../state-slices/filmsSlice'

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

// Infiere los tipos de `RootState` y `AppDispatch` a partir del propio store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
