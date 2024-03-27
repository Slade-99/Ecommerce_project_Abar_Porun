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
    





    const removeStockItem = async (pid) =>{
      try {
          const { data1 } = await axios.put(`/api/v1/product/stock_reduction/${pid}`);
          window.location.reload();
  
      } catch (error){
          console.log(error);
      }
  };



    
    return (
        <Layout >
            <div className ="container mt-3">
                
                    <h1 className="text-center"> Search Results</h1>
                   
                    <h6 className="text-center">{values?.results.length <1? 'No products found' :`Found: ${values?.results.length}` }</h6>
            
          
          <div className="container-fluid">
          <div className="row">
          <div className="col-md-9-3">
          <div className="grid-container">

            
            {values?.results.map((p) => (
              
              
              
                
                
                
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
                      onClick={() => {
                          if (p.quantity > 0) {
                              setCart([...cart, p]);
                              localStorage.setItem('cart', JSON.stringify([...cart, p]));
                              toast.success("Item added to cart"); removeStockItem(p._id);
                          } else {
                              toast.error("Item is out of stock");
                          }
                      }}
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

    












          </div>
        
            </div>
    
        </Layout>
    )
};


export default Search;