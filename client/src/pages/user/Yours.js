import React, { useState, useEffect } from "react";
import { useAuth } from '../../context/auth';
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart";


const Yours = () => {
    const [products, setProducts] = useState([]);
    const[cart,setCart]=useCart();
    const navigate = useNavigate();
    const [ID, setID] = useState("");
    const [Fabric, setFabric] = useState("");
    const [Colour, setColour] = useState("");
    const [Design, setDesign] = useState("");
    const [Price, setPrice] = useState("");
    const [quantities, setQuantities] = useState({});
    const [auth] = useAuth();
    const Customer_ID = auth?.customer?.ID ;

    const addToCart = (product) => {
      const quantityToAdd = quantities[product._id] || 1; // Default to 1 if no quantity is specified
      if (quantityToAdd <= product.quantity) {
        product.quantity = quantityToAdd;
        
        setCart([...cart,product]); localStorage.setItem('cart',JSON.stringify([...cart,product]));
        toast.success("Item added to cart");
      } else {
        toast.error("Maximum quantity exceeded for this item");
      }
    };
    

    const getSingleCustomer = async () => {
        try {
          const { data } = await axios.get(`/api/v1/auth/get-customer/${Customer_ID}`);
          
          
          setID(data.customer.Customer_ID);
          
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(() => {
        getSingleCustomer();
        
    });
      
    const getcustomerrec = async () =>{
        try{
                const {data} = await axios.get(`/api/v1/product/userRecommendation/${ID}`);
                setFabric(data.recommendation.Fabric);
                setColour(data.recommendation.Colour);
                setDesign(data.recommendation.Design);
                setPrice(data.recommendation.Price);
                
        }catch(error){
            console.log(error);
        }

    };


      useEffect(() => {
        getcustomerrec();
        
    });



    const getrecproducts = async () =>{
        try{
            
            const {data} = await axios.get(`/api/v1/product/userRecommendationProducts/${Fabric}/${Colour}/${Design}/${Price}`);
            
            setProducts(data.products);
            
        }catch(error){
            console.log(error);
        }





    };
    useEffect(() => {
        getrecproducts();
        
      });



    
    
    
    
    
    
  

    
    
  
  
    
  
    
  
    
  
    //get filterd product
  
    return (
        
        <Layout>
      
        <div className='container-fluid'>
        
        
          
  
          
  
          <div className="col-md-8-22 ">
          <h1>Recommended For You</h1>
            <div className="grid-container-2">
              
              {products?.map((p) => (
                
                
                
                
                  
                  
                  
                  <div className="card-m-2" style={{  width: "18rem",height:"30rem" }}>
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      style={{ width: "10rem",height:"20rem" }}
                      alt={p.name}
                    />
                    
                    
                    
                   
                   
                   <div className="card-body">
                      <h5 className="card-title">{p.description}</h5>
                      <p className="card-text">{p.fabric_type}</p>
                      <button class="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                    
                    
                      <input
                        type="number"
                        min="0"
                        max={p.quantity}
                        value={quantities[p._id] || ""}
                        onChange={(e) => setQuantities({ ...quantities, [p._id]: parseInt(e.target.value) })}
                        className="form-control"
                        style={{ width: "70px", display: "inline-block", margin: "5px 0" }}
                      />
                      <button
                        className="btn btn-secondary ms-1"
                        onClick={() => addToCart(p)}
                        disabled={p.quantity === 0}
                      >
                        ADD TO CART
                      </button>
                    </div>
                  
                  
                  </div>
                  
               
               
              ))}
            </div>
          </div>
        
          
          
          
          
          
  
          
        
        
        
        
        
        </div>
        
      
      </Layout>
    

  )
};

export default Yours