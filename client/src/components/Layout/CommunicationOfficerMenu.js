import React from 'react'

import { NavLink } from 'react-router-dom';
const CommunicationOfficerMenu = () => {
  return (
    <>

    <div className="text-center">
    
      <div className="list-group">
      
        <NavLink to="/dashboard/employee_communication_officer" className="list-group-item-list-group-item-action">
          Dashboard
        </NavLink>

        <NavLink to="/dashboard/employee_communication_officer/check_conversations" className="list-group-item-list-group-item-action">
            Check Conversations
        </NavLink>

   
      </div>
      </div>
    </>
  );
}

export default CommunicationOfficerMenu