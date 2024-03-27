import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import { useCart } from "../context/cart";
import { useAuth } from '../context/auth';
const CategoryProduct = () => {
  const [auth] = useAuth();
  const admin_id = auth?.employee?._id;
  const params = useParams();
  const[cart,setCart]= useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);


  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);

  const removeStockItem = async (pid) =>{
    try {
        const { data1 } = await axios.put(`/api/v1/product/stock_reduction/${pid}`);
        window.location.reload();

    } catch (error){
        console.log(error);
    }
};
  return (
    <Layout>
      <div className="container mt-3">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found </h6>
        
        
        
          
            
            
        <div className="container-fluid">
          <div className="row">
          <div className="col-md-9-3">
          <div className="grid-container">


              {products?.map((p) => (
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
  );
};

export default CategoryProduct;