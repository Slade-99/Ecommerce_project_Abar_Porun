import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import {toast} from "react-toastify";
import axios from "axios";


const CreateCategory = () => {
  const [billing, setBilling] = useState([]);

  //handle Form


  //get all cat
  const getAllBilling = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/billing-all");
      if (data.success) {
        setBilling(data.billing);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting catgeory");
    }
  };

  useEffect(() => {getAllBilling();}, []);




  
  
  
  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          

          




          <div className="col-md-9">
            <table className="table">
              
              
              <section class="table__header">
              <h1>Sales Table</h1>
              </section>
            
            
            <section class="table__body">
                  
                <thead>
                  <tr>
                    <th scope="col" style={{ fontSize: '20px' }}>Bill_ID</th>
                    <th scope="col" style={{ fontSize: '20px' }}>Date</th>
                    <th scope="col" style={{ fontSize: '20px' }} >Amount</th>
                    <th scope="col" style={{ fontSize: '20px' }}>Price</th>
                    
                  </tr>
                </thead>
                
                
                
                <tbody>
                  {billing?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id} style={{ fontSize: '15px' }}>{c.Bill_ID}</td>
                        <td key={c._id} style={{ fontSize: '15px' }}>{c.Date}</td>
                        <td key={c._id} style={{ fontSize: '15px' }} >{c.Amount}</td>
                        <td key={c._id} style={{ fontSize: '15px' }}>{c.Price}</td>

                          
                          
                          
                          
                          
  
  
                        
    
                      </tr>
                    </>
                  ))}
                </tbody>
                </section>


              </table>
              
            
            
          
          </div>
        </div>
        
      </div>
    </Layout>
  );
};

export default CreateCategory;