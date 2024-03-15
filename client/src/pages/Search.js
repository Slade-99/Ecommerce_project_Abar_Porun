import React from 'react';
import Layout from '../components/Layout/Layout';
import { useSearch } from '../context/search';
const Search = () => {
    const [values,setValues]=useSearch()
    return (
        <Layout title={'Search results'}>
            <div className ="container">
                <div className ="text-center">
                    <h1> Search Results</h1>
                   
                    <h6>{values?.results.length <1? 'No products found' :`Found: ${values?.results.length}` }</h6>
            
          
          <div className="d-flex ">
            
            {values?.results.map((p) => (
              
              
              
                
                
                
                <div className="card-m-2" style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  
                  
                  
                 
                 
                 <div className="card-body">
                    <h5 className="card-title">{p.description}</h5>
                    <p className="card-text">{p.fabric_type}</p>
                    <button class ="btn btn-primary ms-1"> Add to cart</button>
                    <button class ="btn btn-primary ms-1"> Details</button>
                  </div>
                
                
                </div>
                
             
             
            ))}
          </div>
        </div>
            </div>
    
        </Layout>
    )
};


export default Search;