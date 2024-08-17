import {
  createSlice,
  createAsyncThunk,
  configureStore,
} from "@reduxjs/toolkit";
import axios from "axios";

// Define initial state
const initialState = {
  cart: [],
  products: [],
  status: "idle",
  error: null,
  loggedIn: false,
  isAdmin: false,
  admins: [
    {
      id: 1,
      name: "mohamed akkouh",
      username: "mohamed_akkouh",
      password: "mohamed1999",
    },
    {
      id: 2,
      name: "ayman azaroual",
      username: "ayman_azaroual",
      password: "ayman1997",
    },
    { id: 3, name: "admin", username: "admin", password: "admin" },
  ],
};

// Async thunk to fetch products from backend
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("http://localhost:5000/products");
    return response.data;
  }
);

// Async thunk to add a product to backend and state
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData) => {
    const response = await axios.post(
      "http://localhost:5000/products",
      productData
    );
    return response.data;
  }
);

// Async thunk to edit a product in backend and state
export const editProduct = createAsyncThunk(
  "products/editProduct",
  async (productData) => {
    const { id, ...updatedData } = productData;
    const response = await axios.put(
      `http://localhost:5000/products/${id}`,
      updatedData
    );
    return response.data;
  }
);

// Async thunk to delete a product from backend and state
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId) => {
    await axios.delete(`http://localhost:5000/products/${productId}`);
    return productId; // Return the deleted product ID to update state
  }
);

// Slice for managing products
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts: (state, action) => {
      state.products.unshift(action.payload);
    },
    editProducts: (state, action) => {
      const index = state.products.findIndex(
        (product) => product._id === action.payload._id
      );
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...action.payload };
      }
    },
    deleteProducts: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products.unshift(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = {
            ...state.products[index],
            ...action.payload,
          };
        }
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Slice for managing cart
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (productId) => productId !== action.payload
      );
    },
  },
});

// Slice for managing admin authentication
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    login: (state, action) => {
      const { username, password } = action.payload;
      const admin = state.admins.find(
        (admin) => admin.username === username && admin.password === password
      );
      if (admin) {
        state.loggedIn = true;
        state.isAdmin = true;
      }
    },
    logout: (state) => {
      state.loggedIn = false;
      state.isAdmin = false;
    },
  },
});

// Export action creators
export const { addToCart, removeFromCart } = cartSlice.actions;
export const { addProducts, editProducts, deleteProducts } =
  productsSlice.actions;
export const { login, logout } = adminSlice.actions;

// Export selectors
export const selectCart = (state) => state.cart.cart;
export const selectAllProducts = (state) => state.products.products;
export const selectLoggedIn = (state) => state.admin.loggedIn;
export const selectIsAdmin = (state) => state.admin.isAdmin;
export const selectAdmin = (state) => state.admin.admin;

// Combine reducers and create store
export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    products: productsSlice.reducer,
    admin: adminSlice.reducer,
  },
});

// Async action to fetch products initially
store.dispatch(fetchProducts());

export default store;
