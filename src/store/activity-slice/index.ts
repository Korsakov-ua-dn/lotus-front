import { createSlice, createAsyncThunk, AnyAction, PayloadAction } from "@reduxjs/toolkit";
import { activityApi, ActivityType } from "../../api";

// thunk
export const fetchAll = createAsyncThunk<ActivityType[], undefined, { rejectValue: string }>
  ("activity/GET_ALL", async (_, { rejectWithValue }) => {
  const response = await activityApi.getAll();

  if (response.status !== 200) {
    return rejectWithValue("Some error occured, please try again");
  }

  return await response.data
});

export const fetchOne = createAsyncThunk<ActivityType, string, { rejectValue: string }>
  ("activity/GET_ONE", async (id, { rejectWithValue }) => {
  const response = await activityApi.getOne(id);
  
  if (response.status !== 200) {
    return rejectWithValue("Some error occured, please try again");
  }

  return await response.data;
});

// slice
const initialState: ActivtyStateType = {
  data: [],
  current: null,
  loading: false,
  error: null,
}

const activitySlice = createSlice({
  name: "activity/GET_ONE",
  initialState,
  reducers: {
    removeCurrent(state) {
      state.current = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAll.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchOne.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOne.fulfilled, (state, action) => {
        state.current = action.payload;
        state.loading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const actions = activitySlice.actions
export default activitySlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}

// types
type ActivtyStateType = {
  data: ActivityType[]
  current: ActivityType | null
  loading: boolean
  error: string | null
}
