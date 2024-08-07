import { createSlice } from '@reduxjs/toolkit'

export const userAuthSlice = createSlice({
    name: 'authentication',
    initialState: {
        message: null,
        profile_picture: null,
        success: false,
        token: null,
        username: null
    },
    reducers: {
      loginUser: (state, action) => {
       
        state.message = action.payload.message;
        state.profile_picture = action.payload.profile_picture;
        state.success = action.payload.success;
        state.token = action.payload.token;
        state.username = action.payload.username;

      },
      logoutUser: (state) => {
        state.message = null;
        state.profile_picture= null;
        state.success= false;
        state.token= null;
        state.username= null;
      },
   
    }
  })
  
  export const { loginUser, logoutUser } = userAuthSlice.actions
  
  export default userAuthSlice.reducer