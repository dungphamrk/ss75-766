import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { addProduct, deleteProduct, getProduct, updateProduct } from "../../service/productService";
 
 interface ProductIf {
  id: number;
  image: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}


const initialState: ProductIf[] = [];

const productReducer = createSlice({
  name: "product",
  initialState: {
    product: initialState,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state: any, action: any) => {
        // chờ lấy dữ liệu
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        //lấy dữ liệu thành công
        state.product = action.payload;
        console.log(action.payload);
        
      })
      .addCase(getProduct.rejected, (state, action) => {
        // thất bại khi lấy dữ liệu >.<
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.product.push(action.payload);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const productToDelete = action.payload;

        const updatedproducts = state.product.filter(
          (product) => product.id !== productToDelete
        );
        state.product = updatedproducts;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const productIdToUpdate = action.payload.id;
        state.product = state.product.map((product) =>
          product.id === productIdToUpdate ? action.payload : product
        );
      });
  },
});
export default productReducer.reducer