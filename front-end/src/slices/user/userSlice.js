import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  // nom du slice
  name: 'user',
  // état initial du slice
  initialState: { firstName: null, lastName: null, email: null },
  // interractions avec l'état du slice
  reducers: {
    // une fonction d'identification
    setUser: (state, action) => {
      const { firstName, lastName, accessToken } = action.payload;
      state.firstName = firstName;
      state.lastName = lastName;
      state.token = accessToken;
      // console.log('token userSlice : ', accessToken);
    },
  },
});

// export des fonctions qui sont contenues dans authSlice.actions
export const { setUser } = userSlice.actions;

// export du reducer
export default userSlice.reducer;

// exporter des sélecteurs pour l'utilisateur actuel et le token actuel
export const selectFirstNameUser = (state) => state.user.firstName;
export const selectLastNameUser = (state) => state.user.lastName;
