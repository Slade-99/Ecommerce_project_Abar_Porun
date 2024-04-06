import React, { useState, useEffect } from "react";
import AdminMenu from "./../components/Layout/AdminMenu";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import {toast} from "react-toastify";
import { Link } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";


const HomePage = () => {
  
  const [products, setProducts] = useState([]);
  const[cart,setCart]=useCart();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(false);


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

  //getall products
  const getTrendingProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-trending-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getTrendingProducts();
    getTotal();
    getAllCategory();
    
  }, []);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat

  useEffect(() => {
    if (!checked.length || !radio.length) getTrendingProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) ;
  }, [checked, radio]);

  //get filterd product


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




  return (





    <Layout>
      <h1 style={{ fontFamily:"cursive" , fontWeight:"bold" }}>Welcome to Our Website</h1>
      <div className='container-fluid'>
      
      
        

        

        <div className="col-md-8-2 ">
        <h1>Trending Products with 10% Discounts</h1>
          <div className="grid-container">
            
            {products?.map((p) => (
              
              
              
              
                
                
                
                <div className="card-m-2" style={{ width: "18rem",height:"30rem" }}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    style={{ width: "10rem",height:"20rem" }}
                    alt={p.name}
                  />
                  
                  
                  
                 
                 
                 <div className="card-body">
                    <h5 className="card-title">{p.description}</h5>
                    <p className="card-text" style={{ fontSize: '20px' }}>{p.fabric_type}</p>
                    
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
                     
                     <button class="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                  </div>
                
                
                </div>
                
             
             
            ))}
          </div>
        </div>
      
        
        
        
        
        

        
      
      
      
      
      
      </div>
      
    
    </Layout>
  );
};

export default HomePage;
