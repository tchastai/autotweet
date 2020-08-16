import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AsyncStorage } from "react-native";
import Twitter from "../../api/Twitter";

export enum AccessTokenState {
  Unknown,
  Fetching,
  Found,
}

export const checkToken = createAsyncThunk("login/checkToken", async () => {
  await Twitter.getCredentials();
});

export const login = createAsyncThunk("login/login", async () => {
  const accessToken = await Twitter.login();

  if (!accessToken) throw new Error();

  AsyncStorage.setItem("accessToken", accessToken.token);
  AsyncStorage.setItem("accessTokenSecret", accessToken.tokenSecret);
});

export const logout = createAsyncThunk("login/logout", async () => {
  AsyncStorage.removeItem("accessToken");
  AsyncStorage.removeItem("accessTokenSecret");
});

const loginSlice = createSlice({
  name: "login",
  initialState: {
    accessToken: AccessTokenState.Unknown,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Token check reducers
    builder.addCase(checkToken.pending, (state) => {
      state.accessToken = AccessTokenState.Fetching;
    });
    builder.addCase(checkToken.rejected, (state) => {
      state.accessToken = AccessTokenState.Unknown;
    });
    builder.addCase(checkToken.fulfilled, (state) => {
      state.accessToken = AccessTokenState.Found;
    });

    // Login reducers
    builder.addCase(login.pending, (state) => {
      state.accessToken = AccessTokenState.Fetching;
    });
    builder.addCase(login.rejected, (state) => {
      state.accessToken = AccessTokenState.Unknown;
    });
    builder.addCase(login.fulfilled, (state) => {
      state.accessToken = AccessTokenState.Found;
    });

    // Logout reducers
    builder.addCase(logout.fulfilled, (state) => {
      state.accessToken = AccessTokenState.Unknown;
    });
  },
});

export default loginSlice;
