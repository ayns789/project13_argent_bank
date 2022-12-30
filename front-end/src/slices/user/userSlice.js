import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  // nom du slice
  name: 'user',
  // état initial du slice
  initialState: { firstName: null, lastName: null },
  // interractions avec l'état du slice
  reducers: {
    setUser: (state, action) => {
      const { firstName, lastName } = action.payload;
      state.firstName = firstName;
      state.lastName = lastName;
    },
  },
});

// export des fonctions qui sont contenues dans authSlice.actions, pour les composants
export const { setUser } = userSlice.actions;

// export du reducer, pour le store
export default userSlice.reducer;

// exporter des sélecteurs pour l'utilisateur actuel et le token actuel, pour les composants
export const selectFirstNameUser = (state) => state.user.firstName;
export const selectLastNameUser = (state) => state.user.lastName;
