import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import {toast} from "react-toastify";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/auth';
const { Option } = Select;

const CreateProduct = () => {
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  
  const [description, setDescription] = useState("");
  const [colour, setColour] = useState("");
  const [design, setDesign] = useState("");
  const [fabric_type, setFabric_type] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [review, setReview] = useState("");
  const admin_id = auth?.employee?._id;
  const [photo, setPhoto] = useState("");
  var price_range = "";
  if(price>3000){
    var price_range="High";
  }else if(price>1000){
    var price_range="Medium";

  }else{
    var price_range="Low";
  }
  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      
      productData.append("description", description);
      productData.append("colour", colour);
      productData.append("design", design);
      productData.append("price", price);
      productData.append("price_range",price_range);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("fabric_type", fabric_type);
      productData.append("size", size);
      productData.append("review", review);
      productData.append("admin_id", admin_id);
      
      const { data } = axios.post(
        "/api/v1/product/create-product",
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        navigate("/dashboard/employee_admin/create_product");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3" style={{ overflowY: 'auto' }}>
        <div className="row" >
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9" style={{ overflowY: 'auto' , height:"1000px"}}>
            
            <div className="m-1 w-75">
            <h1>Create Product</h1>
              
              
              
            <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select-mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>


              <div className="mb-3">
                <label className="btn btn-outline-secondary">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>



              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>







              <div className="mb-3">
                <textarea type="text"
                  value={description}
                  placeholder="Product Description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
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
                <input
                  type="number"
                  value={size}
                  placeholder="Enter the size"
                  className="form-control"
                  onChange={(e) => setSize(e.target.value)}
                />
              </div>




              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>


   




              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              
     



              <div className="mb-3">
                <input
                  type="text"
                  value={review}
                  placeholder="Review of the product"
                  className="form-control"
                  onChange={(e) => setReview(e.target.value)}
                />
              </div>

{/*
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
                


              </div>
*/}


              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>



            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;