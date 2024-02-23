import React from "react";
import Layout from "./../components/Layout/Layout";
import {useAuth} from "../context/auth";



const HomePage = () => {
  
  const [auth,setAuth]=useAuth()
  console.log(auth)
  return (
    <Layout title={"Abaar Porun"}>
      
      <pre>{JSON.stringify(auth,null,4)}</pre>
    </Layout>
  );
};

export default HomePage;
