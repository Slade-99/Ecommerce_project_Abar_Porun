import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from '../components/Layout/Layout';
import { useSearch } from '../context/search';
import { Prices } from "../components/Prices";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import {toast} from "react-toastify";
import { useAuth } from '../context/auth';
import { Checkbox, Radio } from "antd";

const Search = () => {
  const[cart,setCart]= useCart();
  const [products, setProducts] = useState([]);
  const [auth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [total, setTotal] = useState(0);
  const [radio, setRadio] = useState([]);
  const [quantities, setQuantities] = useState({});
  const admin_id = auth?.employee?._id;
 
    const [values,setValues]=useSearch();
    const navigate = useNavigate();
    const handleIncrement = (productId,q) => {
      const updatedQuantities = { ...quantities };
      const currentQuantity = updatedQuantities[productId] || 0;
      
      if( currentQuantity < q){
      updatedQuantities[productId] = currentQuantity + 1;
      setQuantities(updatedQuantities);
      }
    };
  
    // Function to handle decrementing quantity
    const handleDecrement = (productId) => {
      const updatedQuantities = { ...quantities };
      const currentQuantity = updatedQuantities[productId] || 0;
      if (currentQuantity > 0) {
        updatedQuantities[productId] = currentQuantity - 1;
        setQuantities(updatedQuantities);
      }
    };

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



    const removeStockItem = async (pid) =>{
      try {
          const { data1 } = await axios.put(`/api/v1/product/stock_reduction/${pid}`);
          window.location.reload();
  
      } catch (error){
          console.log(error);
      }
  };
  const filteredProducts = values?.results.filter(p => {
    if (radio.length === 0) return true; // If no price range is selected, return all products
    const [lowerLimit, upperLimit] = radio;
    return p.price >= lowerLimit && p.price <= upperLimit;
  });


    
    return (
        <Layout >
            <div className ="container mt-3">
                
                    <h1 className="text-center"> Search Results</h1>
                   
                    <h6 className="text-center">{filteredProducts.length <1? 'No products found' :`Found: ${filteredProducts.length}` }</h6>
            
          
          <div className="container-fluid">
          <div className="row">
          <div className="col-md-9-3">
          <div className="grid-container">

            
            {filteredProducts.map((p) => (
              
              
              
                
                
                
              <div className={`card-m-2 ${p.quantity === 0 ? 'disabled' : ''}`} style={{  width: "18rem",height:"30rem" }}>
              <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  style={{ width: "10rem",height:"20rem" }}
                  alt={p.name}
              />
              <div className="card-body">
                  <h5 className="card-title">{p.description}</h5>
                  <p className="card-text">{p.fabric_type}</p>
                  
                  
                  <button
                        className="btn btn-secondary ms-1"
                        onClick={() => addToCart(p)}
                        disabled={p.quantity === 0}
                      >
                        ADD TO CART
                    </button>
              
                  
                  
                  
                  
                    <input
                      type="number"
                      min="0"
                      max={p.quantity}
                      value={quantities[p._id] || ""}
                      onChange={(e) => setQuantities({ ...quantities, [p._id]: parseInt(e.target.value) })}
                      className="form-control"
                      style={{ width: "80px", display: "inline-block", margin: "5px 0" }}
                      />
                      <button className="plus" onClick={() => handleIncrement(p._id,p.quantity)}>+</button>
                      <button className="minus" onClick={() => handleDecrement(p._id)}>-</button>
                      
                      
                      
                    <button class="btn btn-primary ms-1" onClick={() => {
                       if (admin_id) {
                     navigate(`/dashboard/employee_admin/product/update-product/${p.slug}`);
                       } else {
                        navigate(`/product/${p.slug}`);
                        }
                        }}>More Details</button>
              
              
              
              </div>
          </div>
                
             
                
            ))}
            </div>
            </div>
            </div>



            <div className="col-md-5-3">
            <div className="column">
              <h4 style={{ fontSize: '25px' }}>Filter by Price</h4>
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
          </div>
    












          </div>
        
            </div>
    
        </Layout>
    )
};


export default Search;