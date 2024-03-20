import React,{useState} from 'react'
import Layout from "./../../components/Layout/Layout"
import {toast} from 'react-toastify'
import axios from 'axios'
import { useNavigate } from "react-router-dom";


const Register = () => {
    const [Name,setName] = useState("");
    const [Email,setEmail] = useState("");
    const [Password,setPassword] = useState("");
    const [Address,setAddress] = useState("");
    const [Phone,setPhone] = useState("");
    const [Gender,setGender] = useState("");
    const [Question,setQuestion] = useState("");
    const [Price,setPrice] = useState("");
    const [Fabric,setFabric] = useState("");
    const [Colour,setColour] = useState("");
    const [Design,setDesign] = useState("");
    const navigate = useNavigate();

// form function
const handleSubmit = async (e) => {
    e.preventDefault()
    try{

        const res = await axios.post('/api/v1/auth/register/customer',
        
        {Name,Password,Email,Address,Phone,Gender,Question});
        if(res.data.success){
            toast.success("User Registered Successfully")
            setTimeout(() => {
              navigate('/login');
          }, 2000);
        }else{
            toast.error(res.data.message)
        }


        const res2 = await axios.post('/api/v1/auth/register/customer/recommendation',
        
        {Fabric,Colour,Design,Gender,Price});
        if(res.data.success){
            
            setTimeout(() => {
              navigate('/login');
          }, 2000);
        }else{
            toast.error(res.data.message)
        }
    
        
    
    
    
    
      }catch(error){
        console.log(error)
        toast.error("Something Went Wrong")
    }




    //console.log(name,email,password,phone,gender,address);
    //toast.success('Register Successfully');
};

  return (
    <Layout title="Register">
        <div className='register'>
        <h1>Register Page</h1>

<div class="wrapper">
<form onSubmit={handleSubmit}>
<h1>Register</h1>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input value = {Email} required onChange={(e) =>setEmail(e.target.value)}   type="Email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input value = {Password}type="password" required onChange={(e) =>setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" />
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputName" className="form-label">Name</label>
    <input value = {Name}type="text" required  onChange={(e) =>setName(e.target.value)} className="form-control" id="exampleInputName" />
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputAddress" className="form-label">Address</label>
    <input value = {Address}type="text" required  onChange={(e) =>setAddress(e.target.value)}  className="form-control" id="exampleInputAddress" />
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputPhone" className="form-label">Phone</label>
    <input value = {Phone}type="text"  required onChange={(e) =>setPhone(e.target.value)}  className="form-control" id="exampleInputPhone" />
  </div>


  <div className="mb-3">
    <label htmlFor="exampleInputgender" className="form-label">Gender</label>
    <input value = {Gender}type="text" required  onChange={(e) =>setGender(e.target.value)}  className="form-control" id="exampleInputgender" />
  </div>


  <div className="mb-3">
    <label htmlFor="exampleInputquestion" className="form-label">What is your age?</label>
    <input value = {Question}type="text" required  onChange={(e) =>setQuestion(e.target.value)}  className="form-control" id="exampleInputquestion" />
  </div>

  

  <div className="mb-3">
  <label htmlFor="exampleInputPrice" className="form-label">Your Price range preference?</label>
  <select value={Price} onChange={(e) => setPrice(e.target.value)} className="form-select" id="exampleInputPrice">
    <option value="">Select</option>
    <option value="High">High</option>
    <option value="Medium">Medium</option>
    <option value="Low">Low</option>
    {/* Add more options as needed */}
  </select>
</div>

<div className="mb-3">
  <label htmlFor="exampleInputFabric" className="form-label">Your Fabric type preference?</label>
  <select value={Fabric} onChange={(e) => setFabric(e.target.value)} className="form-select" id="exampleInputFabric">
    <option value="">Select</option>
    <option value="Cotton">Cotton</option>
    <option value="Lawn">Lawn</option>
    <option value="Silk">Silk</option>
    {/* Add more options as needed */}
  </select>
</div>

<div className="mb-3">
  <label htmlFor="exampleInputColour" className="form-label">Your colour preference?</label>
  <select value={Colour} onChange={(e) => setColour(e.target.value)} className="form-select" id="exampleInputColour">
    <option value="">Select</option>
    <option value="Bright">Bright</option>
    <option value="Dull">Dull</option>
    {/* Add more options as needed */}
  </select>
</div>

<div className="mb-3">
  <label htmlFor="exampleInputDesign" className="form-label">Your design preference?</label>
  <select value={Design} onChange={(e) => setDesign(e.target.value)} className="form-select" id="exampleInputDesign">
    <option value="">Select</option>
    <option value="Print">Print</option>
    <option value="Solid">Solid</option>
    {/* Add more options as needed */}
  </select>
</div>





  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>

        </div>
    </Layout>


  )
}

export default Register