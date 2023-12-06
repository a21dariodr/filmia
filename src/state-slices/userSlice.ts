import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
	id: string,
    email: string,
	emailVerified: boolean,
	keepLogin: boolean
}

const initialState: UserState = {
	id: '',
	email: '',
	emailVerified: false,
	keepLogin: true
}

// State slice for storing the current user
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setId: (state, action: PayloadAction<string>) => {
            state.id = action.payload
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        },
        toggleEmailVerified: state => {
            state.emailVerified = !state.emailVerified
        },
        toggleKeepLogin: state => {
            state.keepLogin = !state.keepLogin
        }
    }
})

export const { setId, setEmail, toggleEmailVerified, toggleKeepLogin } = userSlice.actions

export const getId = (state: any) => state.user.id
export const getEmail = (state: any) => state.user.email
export const getEmailVerified = (state: any) => state.user.emailVerified
export const getKeepLogin = (state: any) => state.user.keepLogin

export default userSlice.reducer
