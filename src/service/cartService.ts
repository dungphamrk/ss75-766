import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductIf } from "../components/types";

export const getCart:any=createAsyncThunk("cart/getAllCart", async () => {
    const response = await axios.get(" http://localhost:3000/carts");
    
    return response.data;
  });
  export const addCart: any = createAsyncThunk("cart/addCart", async (cart) => {
    console.log(cart);
    
    const response = await axios.post("http://localhost:3000/carts", cart);
    return response.data;
  });
  export const deleteCart: any = createAsyncThunk(
    "cart/deleteCart",
    async (id) => {
      const response = await axios.delete(`http://localhost:3000/carts/${id}`);
      return id;
    }
  );
  export const updatecart: any = createAsyncThunk(
    "cart/updatecart",
    async (cart: ProductIf) => {
      const response = await axios.patch(
        `http://localhost:3000/carts/${cart.id}`,
        cart
      );
      
      return cart;
    }
  );