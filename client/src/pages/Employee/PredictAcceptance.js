import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {toast} from 'react-toastify'
import axios from "axios";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";


;

const PredictAcceptance = () => {
    const [output,setOutput] = useState("");
    const [design,setDesign] = useState("");
    const [colour,setColour] = useState("");
    const [fabric_type,setFabric_type] = useState("");
    const [price,setPrice] = useState("");
    const [gender,setGender] = useState("");
  
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const {data} = await axios.post(`/api/v1/auth/acceptance`, {design,colour,fabric_type,price,gender});
          

          if(data.prediction==1){
            toast.success("This product will have a high acceptance rate");
          }else{
            toast.success("Acceptance of this product is very unlikely");
          }

          
          

        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        }
      };
  
  
  
  
  
  
    return (
    <Layout title={"Your Profile"}>
        <h1>Predict Acceptance</h1>
        <div className='container-fluid' >
        <div className='row' >
        <div className='col-md-3'>
            <AdminMenu/>
            </div>
        <div className="wrapper32" style={{ height: "600px" }}>
            <form onSubmit={handleSubmit}>
             
    
              
    
                  
                  
            <div className="mb-3">
  <label htmlFor="designSelect" className="form-label"></label>
  <select
    value={design}
    onChange={(e) => setDesign(e.target.value)}
    className="form-control"
    id="designSelect"
  >
    <option value="">Select Design</option>
    <option value="Solid">Solid</option>
    <option value="Print">Print</option>
  </select>
</div>


                  
 <div className="mb-3">
  <label htmlFor="colourSelect" className="form-label"></label>
  <select
    value={colour}
    onChange={(e) => setColour(e.target.value)}
    className="form-control"
    id="colourSelect"
  >
    <option value="">Select Colour</option>
    <option value="Bright">Bright</option>
    <option value="Dull">Dull</option>
  </select>
</div>

<div className="mb-3">
  <label htmlFor="fabricTypeSelect" className="form-label"></label>
  <select
    value={fabric_type}
    onChange={(e) => setFabric_type(e.target.value)}
    className="form-control"
    id="fabricTypeSelect"
  >
    <option value="">Select Fabric Type</option>
    <option value="Silk">Silk</option>
    <option value="Cotton">Cotton</option>
    <option value="Lawn">Lawn</option>
  </select>
</div>

<div className="mb-3">
  <label htmlFor="fabricTypeSelect" className="form-label"></label>
  <select
    value={price}
    onChange={(e) => setPrice(e.target.value)}
    className="form-control"
    id="fabricTypeSelect"
  >
    <option value="">Select Price Range</option>
    <option value="High">High</option>
    <option value="Medium">Medium</option>
    <option value="Low">Low</option>
  </select>
</div>

<div className="mb-3">
  <label htmlFor="fabricTypeSelect" className="form-label"></label>
  <select
    value={gender}
    onChange={(e) => setGender(e.target.value)}
    className="form-control"
    id="fabricTypeSelect"
  >
    <option value="">Select Gender</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
   
  </select>
</div>
             
    
    
    
    
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
          </div>
          </div>
        </Layout>
  )
}

export default PredictAcceptance