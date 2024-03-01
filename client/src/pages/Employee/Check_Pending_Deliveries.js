import React from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import DeliveryManMenu from "../../components/Layout/DeliveryManMenu";
const Check_Pending_Deliveries = () => {
    return (
        <Layout title={"Dashboard - Check Pending Deliveries"}>
          <div className="container-fluid m-3 p-3">
            <div className="row">
              <div className="col-md-3">
                <DeliveryManMenu />
              </div>
              <div className="col-md-9">
                <h1>Pending Deliveries</h1>
              </div>
            </div>
          </div>
        </Layout>
      );
    };

export default Check_Pending_Deliveries