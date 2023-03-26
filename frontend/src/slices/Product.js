import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productServices from '../services/Product';

const initialState = {
  products: [],
  product: {},
  singleProduct: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
}

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",

  async () => {

    const data = await productServices.getAllProducts();

    return data;
  }
)

export const getSingleProducts = createAsyncThunk(
  "products/getSingleProducts",

  async (slug) => {
    
    const data = await productServices.getSingleProducts(slug);

    return data;
  }
)

export const registerProduct = createAsyncThunk(
  "product/register",

  async (product, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await productServices.registerProduct(product, token)

    console.log(data.status)

    if(data.status === "error") {
      return thunkAPI.rejectWithValue(data.message);
    }

    return data;
  }
)

export const updateProduct = createAsyncThunk(
  "product/update",

  async (product, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await productServices.updateProduct(product, token)

    if(data.status === "error") {
      return thunkAPI.rejectWithValue(data.message);
    }

    return data;
  }
)

export const deleteProduct = createAsyncThunk(
  "product/delete",

  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await productServices.deleteProduct(id, token)

    return data;
  }
)

export const searchProduct = createAsyncThunk(
  "product/search",

  async (search, thunkAPI) => {
    console.log(search)

    const data = await productServices.searchProducts(search)

    return data;  
  }
)

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = "";
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(registerProduct.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    })
    .addCase(registerProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.product = action.payload;
      state.products.unshift(state.product);
      state.message = "Produto criado com sucesso";
    })
    .addCase(registerProduct.rejected, (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    })
    .addCase(updateProduct.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    })
    .addCase(updateProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.products.map((product) => {
        if(product._id === action.payload.product._id) {
          return (product.name = action.payload.product.name);
        }
        return product;
      })
      state.message = "Produto atualizado com sucesso";
    })
    .addCase(updateProduct.rejected, (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    })
    .addCase(getAllProducts.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    })
    .addCase(getAllProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.products = action.payload.products;
    })
    .addCase(getSingleProducts.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    })
    .addCase(getSingleProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.singleProduct = action.payload.product;
    })
    .addCase(deleteProduct.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    })
    .addCase(deleteProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.products = state.products.filter((product) => product._id !== action.payload.id);
      state.message = "Produto removido com sucesso";
    })
    .addCase(searchProduct.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    })
    .addCase(searchProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = null;
      state.products = action.payload.products;
    })
  },
})

export const { resetMessage } = productSlice.actions;
export default productSlice.reducer;