import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticate: false,
    isLoading: false,
    user: null
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setUser: (state, action) => {

        }
    }
})

export const {} = authSlice.actions
export default authSlice.reducer