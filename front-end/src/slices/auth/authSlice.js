import { createSlice } from '@reduxjs/toolkit';
// import { UserService } from '../../services/user.service';

const authSlice = createSlice({
  // nom du slice
  name: 'auth',
  // état initial du slice
  initialState: { user: null, token: null },
  // interractions avec l'état du slice
  reducers: {
    // une fonction d'identification
    logIn: (state, action) => {
      // const { email, pwd } = action.payload;
      // const userService = new UserService();
      // const userData = userService.login({ email, pwd }).then((res) => console.log(res));

      // state.user = email;
      // state.token = userData.data.body.token;
      /////////////
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    },
    // une fonction de déconnexion
    logOut: (state, action) => {
      localStorage.removeItem('redux');
    },
  },
});

// export des fonctions qui sont contenues dans authSlice.actions
export const { logIn, logOut } = authSlice.actions;

// export du reducer
export default authSlice.reducer;

// exporter des sélecteurs pour l'utilisateur actuel et le token actuel
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
