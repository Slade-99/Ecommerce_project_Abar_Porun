<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
=======
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
>>>>>>> 2187e5e4262474e2af885ba685e220123cce33cd
import {toast} from 'react-toastify'
import axios from "axios";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from '../../context/auth';
import { Select } from "antd";
const { Option } = Select;


const Profile = () => {

<<<<<<< HEAD
  const [auth] = useAuth();
  const navigate = useNavigate();
  
  const params = useParams();
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







=======
  const [Customer_ID, setCustomer_ID] = useState("");
  
  
  const [newPassword, setNewPassword] = useState("");
  

  const navigate = useNavigate();
>>>>>>> 2187e5e4262474e2af885ba685e220123cce33cd

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
<<<<<<< HEAD
      const res = await axios.put(`/api/v1/auth/update-customer/${Customer_ID}`, {
        Customer_ID, Name,Password,Email,Address,Phone,Gender,Question
=======
      const res = await axios.post("/api/v1/auth/forgot-password2", {
          Customer_ID,
        
        newPassword,
>>>>>>> 2187e5e4262474e2af885ba685e220123cce33cd
        
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
<<<<<<< HEAD
    <h1>Update Deatils</h1>
=======
    <h1>Update Customer Password</h1>
>>>>>>> 2187e5e4262474e2af885ba685e220123cce33cd
    <div className='container-fluid'>
    <div className='row'>
    <div className='col-md-3'>
        <UserMenu/>
        </div>
<<<<<<< HEAD
    <div className="wrapper33" >
=======
    <div className="wrapper32" >
>>>>>>> 2187e5e4262474e2af885ba685e220123cce33cd
        <form onSubmit={handleSubmit}>
          <h4 className="title">Update Profile</h4>

          <div className="mb-3">
<<<<<<< HEAD
                <textarea
                  type="text"
                  value={Name}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <textarea
                  type="text"
                  value={Password}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={Email}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={Address}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={Phone}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={Gender}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={Question}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
         



=======
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
>>>>>>> 2187e5e4262474e2af885ba685e220123cce33cd

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