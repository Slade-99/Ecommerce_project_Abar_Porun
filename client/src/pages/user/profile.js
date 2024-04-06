import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {toast} from 'react-toastify'
import axios from "axios";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from '../../context/auth';
import { Select } from "antd";



const Profile = () => {

  const [auth] = useAuth();
  
  
  
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
      const res = await axios.put(`/api/v1/auth/update-customer/${Customer_ID}`, {
        Customer_ID, Name,Password,Email,Address,Phone,Gender,Question
        
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
    <Layout title={"Your Profile"}>
    <h1>Update Deatils</h1>
    <div className='container-fluid'>
    <div className='row'>
    <div className='col-md-3'>
        <UserMenu/>
        </div>
    <div className="wrapper33" >
        <form onSubmit={handleSubmit}>
          <h2 className="title">Update Profile</h2>

          <div className="mb-3">
            <h5 style={{ fontSize: '15px' }}>Name</h5>
                <textarea
                  type="text"
                  value={Name}
                  placeholder="write a description"
                  className="form-control"
                  style={{ fontWeight: 'bold' }}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              
              <div className="mb-3">
              <h5 style={{ fontSize: '15px' }}>Email</h5>
                <textarea
                  type="text"
                  value={Email}
                  placeholder="write a description"
                  className="form-control"
                  style={{ fontWeight: 'bold' }}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
              <h5 style={{ fontSize: '15px' }}> Address</h5>
                <textarea
                  type="text"
                  value={Address}
                  placeholder="write a description"
                  className="form-control"
                  style={{ fontWeight: 'bold' }}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="mb-3">
              <h5 style={{ fontSize: '15px' }}>Phone</h5>
                <textarea
                  type="text"
                  value={Phone}
                  placeholder="write a description"
                  className="form-control"
                  style={{ fontWeight: 'bold' }}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="mb-3">
              <h5 style={{ fontSize: '15px' }}>Gender</h5>
                <textarea
                  type="text"
                  value={Gender}
                  placeholder="write a description"
                  className="form-control"
                  style={{ fontWeight: 'bold' }}
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>
              <div className="mb-3">
              <h5 style={{ fontSize: '15px' }} >Age</h5>
                <textarea
                  type="text"
                  value={Question}
                  placeholder="write a description"
                  className="form-control"
                  style={{ fontWeight: 'bold' }}
                  onChange={(e) => setAge(e.target.value)}
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
  );
};

export default Profile;