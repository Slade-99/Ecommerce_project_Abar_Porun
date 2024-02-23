import React,{useState} from 'react'
import Layout from "./../../components/Layout/Layout"
import {toast} from 'react-toastify'
import axios from 'axios'
import { useAuth } from '../../context/auth'
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [ID,setID] = useState("");
    
    const [Password,setPassword] = useState("");
    const [auth,setAuth] = useAuth()
    const navigate = useNavigate();
// form function
const handleSubmit = async (e) => {
    e.preventDefault()
    try{
        if(ID[0]=="C"){
        const Customer_ID=ID
        const res = await axios.post('/api/v1/auth/login/customer',
        
        {Customer_ID,Password});
        if(res.data.success){
            toast.success(res.data && res.data.message);
            setAuth({
              ...auth,
              user: "C",
              customer: res.data.customer,
              token: res.data.token,
            });
            localStorage.setItem('auth',JSON.stringify(res.data));
            navigate('/dashboard');
        }else{
            toast.error(res.data.message)
        }
      
      
      
      
      }else{
        const Employee_ID=ID
        const res = await axios.post('/api/v1/auth/login/employee',
        
        {Employee_ID,Password});
        if(res.data.success){
          toast.success(res.data && res.data.message);
          setAuth({
            ...auth,
            user: "E",
            employee: res.data.employee,
            token: res.data.token,
          });
          localStorage.setItem('auth',JSON.stringify(res.data));
          navigate('/dashboard');
      }else{
          toast.error(res.data.message)
      }
      }
    
    
    
    
    
      }catch(error){
        console.log(error)
        toast.error("Something Went Wrong")
    }




    //console.log(name,email,password,phone,gender,address);
    //toast.success('Register Successfully');
};

  return (
    <Layout title="Login">
        <div className='login'>
        <h1>Login</h1>


<form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputID" className="form-label">ID</label>
    <input value = {ID} required onChange={(e) =>setID(e.target.value)}   type="text" className="form-control" id="exampleInputID" aria-describedby="emailHelp" />
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input value = {Password}type="password" required onChange={(e) =>setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" />
  </div>

  





  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>


        </div>
    </Layout>


  )
}

export default Login