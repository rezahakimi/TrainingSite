import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    setCredentialsUpdate: (state, action) => {
      let uInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (uInfo) {
        uInfo.firstname = action.payload.firstname;
        uInfo.lastname = action.payload.lastname;
        uInfo.phone = action.payload.phone;
        uInfo.profileImg = action.payload.profileImg;
        localStorage.setItem("userInfo", JSON.stringify(uInfo));
      }
      return {
        ...state,

        userInfo: {
          ...state.userInfo,
          firstname: action.payload.firstname,
          lastname: action.payload.lastname,
          phone: action.payload.phone,
          profileImg: action.payload.profileImg,
        },
      };
      //state.userInfo = action.payload;
      // localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
    setToken: (state, action) => {
      //state.accessToken = action.payload;
      const uInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (uInfo) {
        uInfo.accessToken = action.payload.accessToken;
        localStorage.setItem("userInfo", JSON.stringify(uInfo));
      }
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          accessToken: action.payload.accessToken,
        },
      };
    },
  },
});

export const { setCredentials, setCredentialsUpdate, logout, setToken } =
  authSlice.actions;

export default authSlice.reducer;
