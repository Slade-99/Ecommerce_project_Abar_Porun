import React from 'react'
import Layout from '../../components/Layout/Layout'
import About from './../About';
import Footer from './../../components/Layout/Footer';
import AdminMenu from '../../components/Layout/AdminMenu';
import { useAuth } from '../../context/auth';
import DeliveryManMenu from '../../components/Layout/DeliveryManMenu';


const Delivery_Man_Dashboard = () => {
  const [auth] = useAuth();
  return (
    
    
    <Layout>
    <h1>Delivery Man Dashboard</h1>
   <div className='container-fluid'>
   
     <div className='row'>
       <div className='col-md-3'>
       <DeliveryManMenu/>
       </div>
       <div className='col-md-9'> 
         <div className='card wd-75 p-3'>
           
           <h3>  Delivery Man Name: {auth?.employee?.name}</h3>
           <h3>  Phone:{auth?.employee?.phone}</h3>
           <h3>  ID: {auth?.employee?.ID}</h3>
           
           
         </div>
       
       
       
       
       
       </div>



     </div>


   </div>

   
 
 
   </Layout>
  
  
    )
}

export default Delivery_Man_Dashboard