import React, { useState, useEffect } from "react";
import AdminMenu from "./../components/Layout/AdminMenu";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import {toast} from "react-toastify";
import { Link } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";



const HomePage = () => {
  
  const [products, setProducts] = useState([]);
  
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
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
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) ;
  }, [checked, radio]);

  //get filterd product







  return (





    <Layout>
      <h1>Trending Products with Discounts</h1>
      <div className='container-fluid'>
      
      <div className="row">
        

        

        <div className="col-md-8-2 ">
          
          <div className="d-flex">
            
            {products?.map((p) => (
              
              
              
              <Link
                key={p._id}
                to={`/dashboard/employee_admin/update-product/${p.slug}`}
                className="product-link"
              >
                
                
                
                <div className="card-m-2" style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  
                  
                  
                 
                 
                 <div className="card-body">
                    <h5 className="card-title">{p.description}</h5>
                    <p className="card-text">{p.fabric_type}</p>
                    <button class="btn btn-primary ms-1">More Details</button>
                  <button class="btn btn-secondary ms-1">ADD TO CART</button>
                  
                  </div>
                
                
                </div>
                
             
             </Link>
            ))}
          </div>
        </div>
      </div>
        
        
        
        
        

        
      
      
      
      
      
      </div>
    
    </Layout>
  );
};

export default HomePage;
