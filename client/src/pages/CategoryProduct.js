import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import { useCart } from "../context/cart";
const CategoryProduct = () => {
  const params = useParams();
  const[cart,setCart]= useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
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

  return (
    <Layout>
      <div className="container mt-3">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found </h6>
        
        
        
          
            
            
            <div className="d-flex">
              {products?.map((p) => (
                <div className="card-m-2" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />

                  <div className="card-body">
                    <h5 className="card-title">{p.description}</h5>
                    <p className="card-text">{p.fabric_type}</p>
                    <button class="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                    <button className="btn btn-secondary ms-1" onClick={()=>{setCart([...cart,p]); localStorage.setItem('cart',JSON.stringify([...cart,p])); toast.success("item added to cart");}}>ADD TO CART</button>
                  </div>



                </div>
              ))}
            </div>
            {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div> */}
         
        
      </div>
    </Layout>
  );
};

export default CategoryProduct;