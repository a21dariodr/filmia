import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../../state-slices/userSlice'

export const store = configureStore({
    reducer: {
		user: userReducer
	}
})

// Infiere los tipos de `RootState` y `AppDispatch` a partir del propio store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
