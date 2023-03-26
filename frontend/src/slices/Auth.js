import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/Auth";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

export const register = createAsyncThunk("auth/register",

  async (user, thunkAPI) => {
    const data = await authService.register(user);

    if(data.errors){
     return thunkAPI.rejectWithValue(data.errors[0]) 
    }

    return data;
  }
)

export const login = createAsyncThunk("auth/login",

  async (user, thunkAPI) => {
    const data = await authService.login(user);

    if(data.errors){
     return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data;
  }
)

export const logout = createAsyncThunk("auth/logout",
  async () => {
    await authService.logout();
  }
)

export const forgotPassword = createAsyncThunk("auth/forgotPassword",
  async (user, thunkAPI) => {
    const data = await authService.forgotPassword(user);

    if(data.errors){
     return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data;
  }
)

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = null;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.message = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = null;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = null;
        state.user = null;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = null;
        state.user = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.user = null;
      })
  }
})

export const { reset } = authSlice.actions;
export default authSlice.reducer;