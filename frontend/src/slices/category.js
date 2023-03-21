import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryServices from "../services/category";

const initialState = {
  categories: [],
  category: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
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

export const update = createAsyncThunk("category/update",
 async (category, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await categoryServices.updateCategories(category, token);

    if(data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
 }
)

export const deleteCategory = createAsyncThunk("category/delete",
 async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await categoryServices.deleteCategories(id, token);

    if(data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
 }
)

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
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
        state.message = "Categoria cadastrada com sucesso!";
      })
      .addCase(register.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(update.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = null;

        state.categories.map((category) => {
          if(category._id === action.payload.category._id) {
            return (category.name = action.payload.category.name);
          }
          return category;
        })
      })
      .addCase(update.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.isSuccess = false;
        state.category = null;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = null;
        state.message = action.payload.message;

        state.categories = state.categories.filter((category) => {
          return category._id !== action.payload.id;
        })
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.isSuccess = false;
      })
  }
})

export const { resetMessage } = categorySlice.actions;
export default categorySlice.reducer;