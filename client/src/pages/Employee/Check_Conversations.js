import React from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import DeliveryManMenu from "../../components/Layout/DeliveryManMenu";
import CommunicationOfficerMenu from "../../components/Layout/CommunicationOfficerMenu";
const Check_Conversations = () => {
    return (
        <Layout title={"Dashboard - Check Conversations"}>
          <div className="container-fluid m-3 p-3">
            <div className="row">
              <div className="col-md-3">
                <CommunicationOfficerMenu />
              </div>
              <div className="col-md-9">
                <h1>Conversations</h1>
              </div>
            </div>
          </div>
        </Layout>
      );
    };

export default Check_Conversations