import React from 'react';
import Layout from '../components/Layout/Layout';
import { useSearch } from '../context/search';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Search = () => {
    const [values,setValues]=useSearch()
    const navigate = useNavigate();
    return (
        <Layout title={'Search results'}>
            <div className ="container">
                <div className ="text-center">
                    <h1> Search Results</h1>
                   
                    <h6>{values?.results.length <1? 'No products found' :`Found: ${values?.results.length}` }</h6>
            
          
          <div className="d-flex ">
            
            {values?.results.map((p) => (
              
              
              <Link
              key={p._id}
              to={`/product/${p.slug}`}
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
                    <button class="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                  <button class="btn btn-secondary ms-1">ADD TO CART</button>
                  </div>
                
                
                </div>
                
             
                </Link>
            ))}
          </div>
        </div>
            </div>
    
        </Layout>
    )
};


export default Search;