import { combineReducers, createStore } from "redux";
import  cartReducer  from "./reducers/cart";
import  listProductReducer  from "./reducers/listProduct";
import { configureStore } from "@reduxjs/toolkit";

const store= configureStore({
    reducer:{
        cart:cartReducer,
        product:listProductReducer
    }
})
export default store;