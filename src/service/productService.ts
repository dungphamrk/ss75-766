import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductIf } from "../components/types";

export const getProduct:any=createAsyncThunk("product/getAllProduct", async () => {
    const response = await axios.get(" http://localhost:3000/products");
    return response.data;
  });
  export const addProduct: any = createAsyncThunk("product/addProduct", async (product) => {
    const response = await axios.post("http://localhost:3000/products", product);
    return response.data;
  });
  export const deleteProduct: any = createAsyncThunk(
    "product/deleteProduct",
    async (id) => {
      const response = await axios.delete(`http://localhost:3000/products/${id}`);
      return id;
    }
  );
  export const updateProduct: any = createAsyncThunk(
    "product/updateProduct",
    async (product: ProductIf) => {
      const response = await axios.patch(
        `http://localhost:3000/products/${product.id}`,
        product
      );
      
      return product;
    }
  );