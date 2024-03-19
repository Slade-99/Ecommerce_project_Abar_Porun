import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {toast} from 'react-toastify'
import axios from "axios";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from '../../context/auth';
import { Select } from "antd";

const Reviews = () => {
    const [auth] = useAuth();
  
  
    const [Comments,setComments] = useState("");
    const [Rating,setRating] = useState("");
    const [Name, setName] = useState("");
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");
    const [Address, setAddress] = useState("");
    const [Phone, setPhone] = useState("");
    const [Gender, setGender] = useState("");
    const [Question, setAge] = useState("");
    const Customer_ID = auth?.customer?.ID;
    
    const getSingleCustomer = async () => {
      try {
        const { data } = await axios.get(
          `/api/v1/auth/get-customer/${Customer_ID}`
        );
        
        setName(data.customer.Name);
        setPassword(data.customer.Password);
        setEmail(data.customer.Email);
        setAddress(data.customer.Address);
        setPhone(data.customer.Phone);
        setGender(data.customer.Gender);
        setAge(data.customer.Question);
        
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
      getSingleCustomer();
      //eslint-disable-next-line
    }, []);
  
  
  
  
  
  
  
  
    // form function
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(`/api/v1/auth/review`, {
          Comments,Rating
          
        });
        if (res && res.data.success) {
          
          toast.success("Review Submitted Successfully");
          
          
          
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    };
  
  
  
  
    return (
        <Layout title={"Your Profile"}>
        <h1>Submit Reviews</h1>
        <div className='container-fluid'>
        <div className='row'>
        <div className='col-md-3'>
            <UserMenu/>
            </div>
        <div className="wrapper32" >
            <form onSubmit={handleSubmit}>
             
    
              
    
                  
                  
                 
                  <div className="mb-3">
                    <textarea
                      type="text"
                      value={Comments}
                      placeholder="Your comments"
                      className="form-control"
                      onChange={(e) => setComments(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      type="text"
                      value={Rating}
                      placeholder="Rate out of 10"
                      className="form-control"
                      onChange={(e) => setRating(e.target.value)}
                    />
                  </div>
             
    
    
    
    
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
          </div>
          </div>
        </Layout>
  );
};

export default Reviews