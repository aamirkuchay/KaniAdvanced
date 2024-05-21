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
    }
    
})

export const {signinStart,signInSuccess,signInFailure}=userSlice.actions
export default userSlice.reducer;