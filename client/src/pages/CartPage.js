import React from 'react';
import Layout from '../components/Layout/Layout';

import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import AdminMenu from '../components/Layout/AdminMenu';
const CartPage=()=>{
    const [auth,setAuth]=useAuth();
    
    const[cart,setCart]=useCart();
    
    const navigate=useNavigate();
    //total price
    const totalPrice=() =>{
        try {
            let total=0;
            cart?.map(item=>{total=total+item.price});
            return total.toLocaleString("bn-BD",{
                style:"currency",
                currency: "BDT",
            }); 
            
        }catch (error){
           console.log(error); 
        }
    };
    //delete item
    const removeCartItem=(pid) =>{
        try {
            let myCart=[...cart];
            let index=myCart.findIndex((item)=> item._id === pid);
            myCart.splice(index,1);
            setCart(myCart);
            localStorage.setItem('cart',JSON.stringify(myCart));

        } catch (error){
            console.log(error);
        }
    };
    return (
        <Layout>
                              <h1 className="text-center bg-light p-2 mb-1">
                        {`Hello ${auth?.token && auth?.employee?.name}`}
                    </h1>
                    <h4 className="text-center">
                        {cart?.length >= 1? `You have ${cart.length} item in your cart ${auth?.token? "":"please login to checkout"}`:"your cart is empty"}
                    </h4>
             <div className="container-fluid">
            <div className="row">
            <div className="col-md-3">
          <AdminMenu />
        </div>
                
  
                
            </div>
            
            
            
            
            
                {cart?.map( p => (
                <div className ="col-md-8">
                    
                        
                            
                                <div className="col-md-44"> 
                                <img
                                    src={`/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                    width="800px"
                                    height={"800px"}
                                />
                                    
                                    <div className="col-md-44"> 
                                
                                <h4>Name: {p.description}</h4>
                                    <h4>Fabric: {p.fabric_type}</h4>
                                    <h4>Price: {p.price}</h4>
                                    <button className ="btn btn-danger" onClick={()=> removeCartItem(p._id)}>Remove</button>
                                    </div>
                                </div>
                            
                        
                          

                        
                    
                </div>
                   )) }
            
            
            
            
            <div className="col-md-4-text-center">
                    <h1>Cart Summary</h1>
                    <p> Total | Checkout | Payment</p>
                    <h4>Total:{totalPrice()} </h4>
                </div>
            </div></Layout>
    );
};
export default CartPage;