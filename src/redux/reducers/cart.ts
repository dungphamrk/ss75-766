import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { addCart, deleteCart, getCart, updatecart } from "../../service/cartService";
 
 interface cartIf {
  id: number;
  image: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}


const initialState: cartIf[] = [];

const cartReducer = createSlice({
  name: "cart",
  initialState: {
    cart: initialState,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state: any, action: any) => {
        // chờ lấy dữ liệu
      })
      .addCase(getCart.fulfilled, (state, action) => {
        //lấy dữ liệu thành công
        state.cart = action.payload;
        console.log(action.payload);
        
      })
      .addCase(getCart.rejected, (state, action) => {
        // thất bại khi lấy dữ liệu >.<
      })
      .addCase(addCart.fulfilled, (state, action) => {
        state.cart.push(action.payload);
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        const cartToDelete = action.payload;
        const updatedcarts = state.cart.filter(
          (cart) => cart.id !== cartToDelete
        );
        state.cart = updatedcarts;
      })
      .addCase(updatecart.fulfilled, (state, action) => {
        const cartIdToUpdate = action.payload.id;
        state.cart = state.cart.map((cart) =>
          cart.id === cartIdToUpdate ? action.payload : cart
        );
      });
  },
});
export default cartReducer.reducer