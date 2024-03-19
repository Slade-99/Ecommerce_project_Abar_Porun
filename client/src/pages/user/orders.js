import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const Customer_ID = auth?.customer?.ID ;
  const getOrders = async () => {
    try {
      const { data } = await axios.get(`/api/v1/auth/orders/${Customer_ID}`,{
        
        
      });
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();}, [auth?.token]);


    return (
      <Layout title={"Your Orders"}>
        <div className="container-fluid m-3 p-3">
          <div className="row">
            
            
              
              {orders?.map((o, i) => {
                return (
                  <div className="col-md-9"style={{ width: "113rem" , overflow:"auto" , margin:"20px"}}>
                    <table className="table">
                    <section class="table__body">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Status</th>
                          
                          <th scope="col"> date</th>
                          <th scope="col">Payment</th>
                          <th scope="col">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>
                          <td>{o?.status}</td>
                         
                          <td>{o?.Date.split("T")[0]}</td>
                          <td>{o?.payment.success ? "Success" : "Failed"}</td>
                          <td>{o?.products?.length}</td>
                        </tr>
                      </tbody>
                      </section>
                    </table>
                    
                    <div className="container-fluid-2" style={{ width: "0rem" } }>
                    {o?.products?.map((p, i) => (
                      <div className="card-m-23" style={{ width: "50rem" }} key={p._id}>
                        <div className="col-md-88">
                          <img
                            src={`/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.description}
                            width="100px"
                            height={"100px"}
                          />
                        </div>
                        <div className="col-md-89">
                          
                          <p> Name: {p.description}</p>
                          <p>Price : {p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>



                  </div>
                );
              })}
            
          </div>
        </div>
      </Layout>
    );
  };

export default Orders;