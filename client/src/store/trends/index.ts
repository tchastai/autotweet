import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Twitter, { Metrics } from "../../api/Twitter";

export const getAccountInfo = createAsyncThunk(
  "trends/getAccountInfo",
  async () => {
    return Twitter.getAccountInfo();
  }
);

export const getMetrics = createAsyncThunk(
  "trends/getUserMetrics",
  async (username: string) => {
    return Twitter.getMetrics(username);
  }
);

export const getGraph = createAsyncThunk(
  "trends/getGraph",
  async ({ username, count }: { username: string; count?: number }) => {
    return Twitter.getGraph(username, count || 20);
  }
);

export enum LoadingState {
  Unknown,
  Fetching,
  Found,
}

interface State {
  accountInfo: {
    profilePictureURL: LoadingState | string;
    username?: string;
  };
  metrics: {
    status: LoadingState;
    data?: Metrics;
  };
  graph: {
    status: LoadingState;
    data?: string;
  };
}

const initialState: State = {
  accountInfo: { profilePictureURL: LoadingState.Unknown, username: undefined },
  metrics: {
    status: LoadingState.Unknown,
  },
  graph: {
    status: LoadingState.Unknown,
  },
};

const trendsSlice = createSlice({
  name: "trends",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // getAccountInfo reducers
    builder.addCase(getAccountInfo.pending, (state) => {
      state.accountInfo.profilePictureURL = LoadingState.Fetching;
    });
    builder.addCase(getAccountInfo.rejected, (state) => {
      state.accountInfo.profilePictureURL = LoadingState.Unknown;
    });
    builder.addCase(getAccountInfo.fulfilled, (state, action) => {
      state.accountInfo.profilePictureURL = action.payload.profilePictureURL;
      state.accountInfo.username = action.payload.username;
    });

    // getMetrics reducers
    builder.addCase(getMetrics.pending, (state) => {
      state.metrics.status = LoadingState.Fetching;
    });
    builder.addCase(getMetrics.rejected, (state) => {
      state.metrics.status = LoadingState.Unknown;
    });
    builder.addCase(getMetrics.fulfilled, (state, action) => {
      state.metrics.status = LoadingState.Found;
      state.metrics.data = action.payload;
    });

    // getGraph reducers
    builder.addCase(getGraph.pending, (state) => {
      state.graph.status = LoadingState.Fetching;
    });
    builder.addCase(getGraph.rejected, (state) => {
      state.graph.status = LoadingState.Unknown;
    });
    builder.addCase(getGraph.fulfilled, (state, action) => {
      state.graph.status = LoadingState.Found;
      state.graph.data = action.payload;
    });
  },
});

export default trendsSlice;
