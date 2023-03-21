import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryServices from "../services/category";

const initialState = {
  categories: [],
  category: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
}

export const getCategories = createAsyncThunk("category/getCategories",
  async () => {
    const data = await categoryServices.getCategories();
    return data;
  }
)

export const register = createAsyncThunk("category/register",
 async (category, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    
    const data = await categoryServices.registerCategories(category, token);

    if(data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
 } 
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        state.category = action.payload;
        state.categories.unshift(state.category);
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.isSuccess = false;
        state.categories = null;
      })
  }
})

export const { reset } = categorySlice.actions;
export default categorySlice.reducer;