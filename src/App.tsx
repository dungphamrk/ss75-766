import React, { useEffect, useState } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Notification from './components/Notification';
import './styles/bootstrap.min.css';
import './styles/style.css';
import {ProductIf} from '../src/components/types';
import { useDispatch, useSelector } from 'react-redux';
import {addCart,deleteCart, updatecart} from './service/cartService'
import { getCart } from './service/cartService';
import { addProduct, getProduct, updateProduct } from './service/productService';
const App: React.FC = () => {
  const products:ProductIf[] =useSelector((state:any)=>state.product.product);
  
  const cart:ProductIf[] =useSelector((state:any)=>state.cart.cart);
  
  const dispatch=useDispatch();
  useEffect(()=>{
   dispatch(getCart());
   dispatch(getProduct());
  },[])
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (notificationMessage !== "") {
      const timer = setTimeout(() => {
        setNotificationMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notificationMessage]);
  useEffect(() => {
    if (errorMessage !== "") {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);
  const handleAddToCart = (productId: number) => {
    if (cart.find((element)=>element.id===productId)) {
       let addedProduct = {...cart.find((element)=>element.id===productId)}; 
      dispatch(updateProduct({...products[productId-1],quantity:products[productId-1].quantity-1}))      
      if (addedProduct.quantity) {
         dispatch(updatecart({...addedProduct,quantity:addedProduct.quantity+1}));
      }
    }else{
      let addedProduct={...products[productId-1],quantity:1}
       dispatch(addCart(addedProduct));
       dispatch(updateProduct({...products[productId-1],quantity:products[productId-1].quantity-1})) 
    }
   
    
   
    setNotificationMessage("Add to cart successfully");
  };
  const handleDelete=(productId:number)=>{
    dispatch(deleteCart(productId));
    setErrorMessage("Delete successfully");
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1>Shopping Cart</h1>
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <ProductList products={products} onAddToCart={handleAddToCart} />
        </div>
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <Cart cart={cart} delete1={handleDelete} />
          {notificationMessage && <Notification message={notificationMessage} />}
          {errorMessage && <Notification message={errorMessage} isError={true} />}

        </div>
      </div>
    </div>
  );
};

export default App;
