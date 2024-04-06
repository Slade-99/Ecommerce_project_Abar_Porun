import React from "react";
import Layout from "./../components/Layout/Layout";

const Contact = () => {
  return (
    <Layout title={"Contacts"}> 
      <div className="row contactus ">
        
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-1" style={{ fontSize: '25px' , fontFamily:"cursive"}}>
            Admin Contact Details: <br></br>
            Nafisa Khan Youkee : <br></br>
            Fariha Shams Ahmed: <br></br>
            Sandia Tasnim: <br></br>
          </p>
         
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
