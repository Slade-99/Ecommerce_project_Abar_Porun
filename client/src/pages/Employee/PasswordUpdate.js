
import Layout from "./../../components/Layout/Layout";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import axios from "axios";
import AdminMenu from '../../components/Layout/AdminMenu';

const PasswordUpdate = () => {
    const [Customer_ID, setCustomer_ID] = useState("");
  
  
    const [newPassword, setNewPassword] = useState("");
    
  
    const navigate = useNavigate();
  
    // form function
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post("/api/v1/auth/forgot-password2", {
            Customer_ID,
          
          newPassword,
          
        });
        if (res && res.data.success) {
          
          toast.success("Updated Successfully");
          
          
          
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    };




  return (
    <Layout>
    <h1>Update Customer Password</h1>
    <div className='container-fluid'>
    <div className='row'>
    <div className='col-md-3'>
        <AdminMenu/>
        </div>
    <div className="wrapper32" >
        <form onSubmit={handleSubmit}>
          <h4 className="title">RESET CUSTOMER PASSWORD</h4>

          <div className="mb-3">
            <input
              type="text"
              value={Customer_ID}
              onChange={(e) => setCustomer_ID(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Customer ID "
              required
            />
          </div>
         


          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter New Password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </div>
      </div>
      </div>
   
 
 
   </Layout>
  )
}

export default PasswordUpdate;