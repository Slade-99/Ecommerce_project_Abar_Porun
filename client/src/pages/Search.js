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
  const admin_id = auth?.employee?._id;
 
    const [values,setValues]=useSearch();
    const navigate = useNavigate();
    

    const addToCart = (product) => {
        if (product.quantity > 0) {
          // Check if the product is already in the cart
          const existingCartItem = cart.find(item => item._id === product._id);
          const existingCartItem_quantity = cart.filter(item => item._id === product._id).length;
          if (!existingCartItem || existingCartItem_quantity < product.quantity) {
            // Add product to cart if it's not already added or the quantity is less than the available quantity
            setCart([...cart,product]); localStorage.setItem('cart',JSON.stringify([...cart,product]));
            toast.success("Item added to cart");
            
          } else {
            toast.error("Maximum quantity reached for this item");
          }
        } else {
          toast.error("Item is out of stock");
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
              
              
              
                
                
                
              <div className={`card-m-2 ${p.quantity === 0 ? 'disabled' : ''}`} style={{ width: "18rem" }}>
              <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
              />
              <div className="card-body">
                  <h5 className="card-title">{p.description}</h5>
                  <p className="card-text">{p.fabric_type}</p>
                  <button class="btn btn-primary ms-1" onClick={() => {
                       if (admin_id) {
                     navigate(`/dashboard/employee_admin/product/update-product/${p.slug}`);
                       } else {
                        navigate(`/product/${p.slug}`);
                        }
                        }}>More Details</button>
                  
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