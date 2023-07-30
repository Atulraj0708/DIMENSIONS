import React,{useEffect, useState} from 'react'
import { Navbar, Products,CheckOut ,Cart} from './components'
import { commerce } from '../src/components/library/Commerce'
import { BrowserRouter as Router ,Routes,Route } from 'react-router-dom'

const App = () => {

    const [prds,setPrds]=useState([]);
    const [cart,setCart]=useState({});
    const[order,setOrder]=useState({});
    const[errorMessage,setErrorMessage]=useState('');

    const fetchProducts=async()=>{
        const {data}=await commerce.products.list();
        setPrds(data);
        console.log(data)
    }

    const fetchCart=async()=>{
      setCart(await commerce.cart.retrieve());
    }

    const handleAddToCart=async (prdId,quantity)=>{
      const res =await commerce.cart.add(prdId,quantity);
      setCart(res);
    }
    const handleUpdateCart=async(prdId,quantity)=>{
        const res=await commerce.cart.update(prdId,{quantity});
        setCart(res)
    }
    const handleRemoveCart=async(prdId)=>{
        const res=await commerce.cart.remove(prdId);
        setCart(res)
    }
    const handleEmptyCart=async()=>{
        const res=await commerce.cart.empty();
        setCart(res)
    }

    const refreshCart = async () => {
      const newCart = await commerce.cart.refresh();
  
      setCart(newCart);
    };

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
      try {
        const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
  
        setOrder(incomingOrder);
  
        refreshCart();
      } catch (error) {
        setErrorMessage(error.data.error.message);
      }
    };
  
    useEffect(()=>{
        fetchProducts();
        fetchCart(); 
    },[]);
   
  return (
    
    <Router>
      <div>
        <Navbar totalItems={cart.total_items}/>
        <Routes>
          <Route exact path='/'  element={<Products prds={prds} onAddToCart={handleAddToCart}/>}/>
          <Route exact path='/checkout'  element={<CheckOut cart={cart} order={order} onCaptureCheckOut={handleCaptureCheckout} error={errorMessage}/>}/>
          <Route exact path='/cart' element={<Cart cart={cart} handleUpdateCart={handleUpdateCart} handleRemoveCart={handleRemoveCart} handleEmptyCart={handleEmptyCart}/>}/>
        </Routes>
    </div>
    </Router>
    
  )
}

export default App