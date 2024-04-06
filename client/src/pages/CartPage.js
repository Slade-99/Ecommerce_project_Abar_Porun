import React, { useState, useEffect } from "react";
import Layout from '../components/Layout/Layout';
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import {toast} from 'react-toastify'
import AdminMenu from '../components/Layout/AdminMenu';
import UserMenu from '../components/Layout/UserMenu';
const CartPage=()=>{
  const [auth] = useAuth();
    
    const[cart,setCart]=useCart();
    const [clientToken, setClientToken] = useState("");
    const [newAddress, setNewAddress] = useState(auth?.customer?.address);
    const [proceedToPayment, setProceedToPayment] = useState(false);
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
    const navigate=useNavigate();
    const Customer_ID = auth?.customer?.ID;
    const Email = auth?.customer?.email;
     const currentDate = new Date();
     const currentTime = currentDate.toLocaleTimeString();
     
     const handleQuantityChange =  async (product,productId, change) => {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${product.slug}`
      );

      const original_quantity = data.product.quantity;
      const updatedCart = cart.map(item => {
        if (item._id === productId) {

          
          if(item.quantity<original_quantity || change!=1){
          const newQuantity = item.quantity + change;
          // Ensure quantity doesn't go below 1
          item.quantity = newQuantity < 1 ? 1 : newQuantity;
          }
        }
        return item;
      });
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    };
     
     
    //total price
    const totalPrice=() =>{
        try {
            let total=0;
            
            cart?.map(item=>{total=total+(item.price)*(item.quantity)});
            
            return total
            
        }catch (error){
           console.log(error); 
        }
    };

    const totalQuantity=() =>{
      try {
          let total=0;
          
          cart?.map(item=>{total=total+(item.quantity)});
          
          return total
          
      }catch (error){
         console.log(error); 
      }
  };

    

    const Price = totalPrice();
    const quant = totalQuantity();
    //delete item
    const removeCartItem= async (pid) =>{
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


      //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);








  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
        Customer_ID,
        currentDate,
        
        currentTime,
        quant,
        Price,
        newAddress,
        Email,
      });

      

      const dictionary = new Map([
       
      ]);
      
      
      cart.map((i) => {
        
        dictionary.set(i._id, i.quantity);
      
      
      
      });
    



      async function postData() {
        
        
        for (const [key, value] of dictionary) {
          
          for (let i=0;i<value;i++){
          const { data1 } = await axios.put(`/api/v1/product/stock_reduction/${key}`);}
        
      
      
      }
        
        
        
          

            
          
        
        
        
    }
    
    postData();
    






const Amount = quant




      const{data2} = await axios.post("/api/v1/product/billing",{currentDate,Customer_ID,Amount,Price });
      
      
      

      
      
      
      
      setLoading(false);
      
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/customer/orders");
      //const { data5 } = await axios.delete(`/api/v1/product/clear-stock`);


      


      const customerName="Azwad"
      const{data3} = await axios.post("/api/v1/product/invoice",{customerName,Customer_ID,Price,Amount,currentDate });

      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }


    const {data1} = await axios.post("/api/v1/product/purchase-email", {
      Email,
      Price,
      
      
    });
  };

















  

    return (
        <Layout>
          {!proceedToPayment ? (
            <>

          
                              <h1 className="text-center bg-light p-2 mb-1">
                        {`Hello ${auth?.token && auth?.customer?.name}`}
                        
                    </h1>



              
                    <h4 className="text-center">
                        {cart?.length >= 1? `You have ${cart.length} item in your cart ${auth?.token? "":"please login to checkout"}`:"your cart is empty"}
                    </h4>
             <div className="container-fluid">
            <div className="row">
              
              
            
                
  
                
            </div>
            
            
            
            
            
                {cart?.map( p => (
                <div className ="col-md-8">
                    
                        
                            
                                <div className="col-md-59999"> 
                                <div className="col-md-55">
                              <img
                                    src={`/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                    width="200px"
                                    height={"200px"}
                                />
                                    </div>
                                    <div className="col-md-22"> 
                                
                                <h4>Name: {p.description}</h4>
                                    <h4>Fabric: {p.fabric_type}</h4>
                                    <h4>Price: {p.price}</h4>
                                    <h4>Quantity: {p.quantity}</h4>
                                    <div className="quantity-control">
                                    <button className="btn btn" onClick={() => handleQuantityChange(p,p._id, -1)}>-</button>
                                    
                                    <button className="btn btn" onClick={() => handleQuantityChange(p,p._id, 1)}>+</button>
                                    </div>
                                    
                                    <button className ="btn btn-danger" onClick={() => removeCartItem()}>Remove</button>
                                    </div>
                                </div>
                            
                        
                          

                        
                    
                </div>
                   )) }
            
            
            
            
            <div className="col-md-4-text-center">
              
                    <h1>Cart Summary</h1>
                    
                    <p> Total | Checkout | Payment</p>
                    <h4>Total:{totalPrice()} </h4>
                
                    {auth?.customer?.address ? (
              <>
              <h4>Current Address</h4>
      <input
        type="text"
        value={newAddress}
        onChange={(e) => setNewAddress(e.target.value)}
        className="input-address"
      />
                <div className="mb-3">
                  
                
                  <button
              className="btn btn-success"
              onClick={() => setProceedToPayment(true)}
            >
              Proceed To Payment
            </button>




                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/dashboard/customer/profile")}
                  >
                    Update Address
                  </button>


                    










                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Plase Login to checkout
                  </button>
                )}
                
              </div>
            )}
                        


            </div>
          
                
            </div>

            </>):(




            
              
                
              
                
                
                
               
                <div className="col-md-3-text-center">
                  <DropIn
                    options={{
                      authorization: clientToken
                      
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />

<div style={{ display: 'flex', justifyContent: 'space-between' }}>
  <button
    className="btn btn-success"
    onClick={handlePayment}
    disabled={loading || !instance || !auth?.customer?.address}
  >
    {loading ? "Processing ...." : "Make Payment"}
  </button>
  <button
    className="btn btn-danger"
    onClick={() => setProceedToPayment(false)}
  >
    Return to Cart
  </button>
</div>
                  </div>

                
                
              
              
             
            
            )};
            
            </Layout>
    );
};
export default CartPage;