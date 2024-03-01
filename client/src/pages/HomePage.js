import React from "react";
import Layout from "./../components/Layout/Layout";
import {useAuth} from "../context/auth";



const HomePage = () => {
  
  const [auth,setAuth]=useAuth()
  console.log(auth)
  return (
    <Layout title={"Abaar Porun"}>
      
    
    <h1>Welcome to our Store!!</h1>


      
    </Layout>
  );
};

export default HomePage;
