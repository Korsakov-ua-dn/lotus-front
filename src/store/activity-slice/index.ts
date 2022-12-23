import { createSlice, createAsyncThunk, AnyAction, PayloadAction } from "@reduxjs/toolkit";
import { activityApi, ActivityType } from "../../api";

// thunk
export const fetchAll = createAsyncThunk<ActivityType[], undefined, { rejectValue: string }>
  ("activity/GET_ALL", async (_, { rejectWithValue }) => {
    try {

      const response = await activityApi.getAll();
      return await response.data
      
    } catch (err) {
      return rejectWithValue("Some error occured, please try again");
    }
  });

export const fetchOne = createAsyncThunk<ActivityType, string, { rejectValue: string }>
  ("activity/GET_ONE", async (id, { rejectWithValue }) => {
    try {

      const response = await activityApi.getOne(id);
      return await response.data
      
    } catch (err) {
      return rejectWithValue("Произошла ошибка, попробуйте перезагрузить страницу.");
    }
  });

// Обработка ошибок
const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
}

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
        const now = new Date().getTime();
        state.current = {
          ...action.payload, 
          timeOffset: now - (+action.payload.now),
        };
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

// types
type ActivtyStateType = {
  data: ActivityType[]
  current: (ActivityType & {timeOffset: number}) | null
  loading: boolean
  error: string | null
}
