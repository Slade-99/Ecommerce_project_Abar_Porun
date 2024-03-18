import React from 'react'
import Layout from '../../components/Layout/Layout'
import About from './../About';
import Footer from './../../components/Layout/Footer';

import { useAuth } from '../../context/auth';
import UserMenu from '../../components/Layout/UserMenu';


const Dashboard = () => {
  const [auth] = useAuth();
  return (
    
    <Layout>
    <h1>Customer Dashboard</h1>
   
   
   
   
   <div className='container-fluid'>
   
     <div className='row'>
       <div className='col-md-3'>
       <UserMenu/>
       </div>
       <div className='col-md-9'> 
         <div className='card wd-75 p-3'>
           
           <h3> Customer Name: {auth?.customer?.name}</h3>
           <h3> Customer Email: {auth?.customer?.email}</h3>
           
           
           
         </div>
       
       
       
       
       
       </div>



     </div>


   </div>

   
 
 
   </Layout>
  )
}

export default Dashboard