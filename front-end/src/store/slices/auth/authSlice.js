import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { createSlice } from '@reduxjs/toolkit';
import { UserService } from '../../../services/user.service';
// import axios from 'axios';
// import { useDispatch } from 'react-redux';

export const getLogin = createAsyncThunk(
  'auth/getLogin',
  async ({ email, pwd, rememberMe }, { rejectWithValue }) => {
    try {
      const userService = new UserService();
      const datas = await userService.login(email, pwd);
      // const dispatch = useDispatch();
      ///////
      // const baseUrl = 'http://localhost:3001/api/v1/user';
      // const datas = await axios.post(`${baseUrl}/login`, {
      //   email: email,
      //   password: pwd,
      // });
      // console.log('retour axios : ', datas.data.body.token);
      // console.log('retour axios rememberMe : ', rememberMe);
      // const response = {rememberMe, datas.data.body.token, email};
      const response = { user: email, accessToken: datas.data.body.token, rememberMe };
      // dispatch(logIn({ user: email, accessToken: datas.data.body.token, rememberMe }));
      return response;
    } catch (error) {
      console.log('error : ', error);
      rejectWithValue(error.response.data);
    }
  }
);

// const myReducer = (state, action) => {
//   switch (action.type) {
//     case 'MY_ACTION':
//       // handle the action and update the state
//       return {
//         ...state,
//         // update the state with the action payload
//         rememberMe: action.payload.rememberMe,
//       };
//     default:
//       return state;
//   }
// };

function isRejectedAction(action) {
  return action.type.endsWith('rejected');
}

const authSlice = createSlice({
  // nom du slice
  name: 'auth',
  // état initial du slice
  initialState: {
    user: null,
    token: null,
    isSuccess: false,
    // message: '',
    loading: false,
    rememberMe: false,
  },
  // interractions avec l'état du slice
  reducers: {
    // // une fonction d'identification
    // logIn: (state, action) => {
    //   const { user, accessToken, rememberMe } = action.payload;
    //   state.user = user;
    //   state.token = accessToken;
    //   state.rememberMe = rememberMe;
    // },
    // une fonction de déconnexion
    logOut: (state, action) => {
      localStorage.removeItem('redux');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLogin.pending, (state, { payload }) => {
        const { user, accessToken, rememberMe } = payload;
        state.loading = true;
        // state.rememberMe = rememberMe;
        // state.token = accessToken;
        // state.user = user;
        console.log('pending : ', payload);
        console.log('fulfilled, payload[1] : ', accessToken);
        console.log('payload[0] : ', user);
        console.log('payload[2] : ', rememberMe);
      })
      .addCase(getLogin.fulfilled, (state, { payload }) => {
        const { user, accessToken, rememberMe } = payload;
        state.user = user;
        state.token = accessToken;
        state.isSuccess = true;
        state.loading = false;
        state.rememberMe = rememberMe;
        console.log('fulfilled, payload[1] : ', accessToken);
        console.log('payload[0] : ', user);
        console.log('payload[2] : ', rememberMe);
      })
      .addCase(getLogin.rejected, (state, { payload }) => {
        const { accessToken } = payload;
        state.message = accessToken;
        state.loading = false;
        console.log('rejected : ', accessToken);
      })
      // permet de faire correspondre les actions entrantes à la propre fonction de filtre au lieu
      // de la seule propriété action.type.
      .addMatcher(
        isRejectedAction,
        // `action` will be inferred as a RejectedAction due to isRejectedAction being defined as a type guard
        (state, action) => {}
      )
      // .addMatcher({
      //   MY_ACTION: myReducer,
      // })
      // cas par défaut si aucun gestionnaire ne correspond
      .addDefaultCase((state, action) => {});
  },
});

// export des fonctions qui sont contenues dans authSlice.actions
// export const { logIn, logOut, updateConnecting } = authSlice.actions;
export const { logOut, logIn } = authSlice.actions;

// export du reducer
export default authSlice.reducer;

// exporter des sélecteurs pour l'utilisateur actuel et le token actuel
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentRememberMe = (state) => state.auth.rememberMe;
// export const selectCurrentConnecting = (state) => state.auth.connecting;
