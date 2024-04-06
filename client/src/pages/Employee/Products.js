import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import {toast} from "react-toastify";
import { Link } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../../components/Prices";
import { useCart } from "../../context/cart";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const[cart,setCart]= useCart();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
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
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };






  return (





    <Layout>
      <div className='container-fluid'>
      
      <div className="row">
        

        

        <div className="col-md-9-2 ">
          
        <div className="grid-container">
            
            {products?.map((p) => (
              
              
              
              
                
                
                
                <div className="card-m-2" style={{ width: "18rem" , height:"40rem" }}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  
                  
                  
                 
                 
                 <div className="card-body">
                    <h5 className="card-title">{p.description}</h5>
                    <p className="card-text" style={{ fontSize: '20px' }}>{p.fabric_type}</p>
                    <button class="btn btn-primary ms-1" onClick={() => navigate(`./update-product/${p.slug}`)}>Update Details</button>
                  
                  
                    
                  
                  </div>
                
                
                </div>
                
             
             
            ))}
          </div>
        </div>
      </div>
        
        
        
        
        
        <div className="col-md-5-2">
        
          <div className="col">
            <h5 style={{ fontSize: '25px', fontWeight:"bold" }}>Filter by Category</h5>
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                style={{ fontSize: '15px' , fontWeight:"bold"}}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}

          <div className="flex">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
          </div>
          
          
          
          
          <div className="column">
          <h4 style={{ fontSize: '25px',fontWeight:"bold" }}>Filter by Price</h4>
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}  style={{ fontSize: '15px' , fontWeight:"bold"}}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
 
        
        
        </div>
        
      
      
      
      
      
      </div>
    
    </Layout>
  );
};

export default Products;