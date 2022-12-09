import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  // nom du slice
  name: 'auth',
  // état initial du slice
  initialState: { user: null, token: null },
  // interractions avec l'état du slice
  reducers: {
    // une fonction d'identification
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
      // console.log('token authSlice : ', accessToken);
    },
    // une fonction de déconnexion, pour réinitialiser le state du slice
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
});

// export des fonctions qui sont contenues dans authSlice.actions
export const { setCredentials, logOut } = authSlice.actions;

// export du reducer
export default authSlice.reducer;

// exporter des sélecteurs pour l'utilisateur actuel et le token actuel
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
