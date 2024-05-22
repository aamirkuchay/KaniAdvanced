import { createSlice } from "@reduxjs/toolkit";



const initialState={
    currentUser:null,
    error:null,
    Loading:false
}


const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        signinStart: (state) => {
            state.Loading = true;
            state.error = null;
          },
          signInSuccess: (state, action) => {
            state.Loading = false;
            state.currentUser = action.payload;
            state.error = false;
          },
          signInFailure: (state, action) => {
            state.Loading = false;
            state.error = action.payload;
          },
          signoutStart: (state) => {
            state.Loading = true;
            state.error = null;
          },
          signoutSuccess: (state, action) => {
            state.currentUser = null;
            state.error = false;
            state.Loading = false;
          },
          signoutFailure: (state, action) => {
            state.error = action.payload;
            state.Loading = false;
          },
          
    }
    
})

export const {signinStart,signInSuccess,signInFailure,signOutStart,signoutFailure,signoutSuccess}=userSlice.actions
export default userSlice.reducer;