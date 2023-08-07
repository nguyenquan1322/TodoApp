import { createSlice } from "@reduxjs/toolkit";

export const authState = {
  loading: "loading",
  loggedIn: "loggedIn",
  loggedOut: "loggedOut",
};

const initialState = {
  status: authState.loading,
  authInfo: {
    userName: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // loadUserInfo: (state) => {
    //   state.status = authState.loading;
    //   state.authInfo.userName = "";
    // },
    setLogin: (state, action) => {
      state.status = authState.loggedIn;
      state.authInfo.userName = action.payload;
    },
    setLoggedOut: (state) => {
      localStorage.removeItem("todoToken");
      state.status = authState.loggedOut;
      state.authInfo.userName = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLogin, setLoggedOut } = authSlice.actions;

export default authSlice.reducer;
