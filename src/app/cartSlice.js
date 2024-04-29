import { createSlice } from "@reduxjs/toolkit";
import products from "../data/items";
import items from "../data/items";
const initialState = {
  items: products,
  item: [],
  totalQuantity: 0,
  totalPrice: 0,
};
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
});

export const {
  addItem,
  removeItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  getCartTotal,
} = cartSlice.actions;

export default cartSlice.reducer;
