import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  item: [],
  totalQuantity: 0,
  totalPrice: 0,
  status: "idle",
  error: null,
};

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  "cart/fetchProducts",
  async () => {
    const response = await fetch(
      "http://localhost:6001/api/products/admin/product"
    );
    const data = await response.json();
    // console.log(data.product);
    return data.product; // Return the products array from the response
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const index = state.item.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.item[index].quantity += 1;
      } else {
        state.item.push(action.payload);
      }
    },

    increaseItemQuantity: (state, action) => {
      state.item = state.item.map((product) => {
        if (product.id === action.payload) {
          return { ...product, quantity: product.quantity + 1 };
        }

        return product;
      });
    },

    removeItem: (state, action) => {
      state.item = state.item.filter((item) => item.id !== action.payload);
    },

    decreaseItemQuantity: (state, action) => {
      state.item = state.item.map((product) => {
        if (product.id === action.payload) {
          return { ...product, quantity: product.quantity - 1 };
        }

        return product;
      });
    },

    getCartTotal: (state) => {
      let { totalPrice, totalQuantity } = state.item.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const itemTotal = price * quantity;
          cartTotal.totalPrice += itemTotal;
          cartTotal.totalQuantity += quantity;
          return cartTotal;
        },

        {
          totalPrice: 0,
          totalQuantity: 0,
        }
      );
      state.totalPrice = totalPrice;
      state.totalQuantity = totalQuantity;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // Set fetched products to items state
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  addItem,
  removeItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  getCartTotal,
} = cartSlice.actions;

export default cartSlice.reducer;
