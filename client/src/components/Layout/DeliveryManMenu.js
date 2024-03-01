import React from 'react'

import { NavLink } from 'react-router-dom';

const DeliveryManMenu = () => {
  return (
    <>

    <div className="text-center">
    
      <div className="list-group">
      
        <NavLink to="/dashboard/employee_delivery_man" className="list-group-item-list-group-item-action">
          Dashboard
        </NavLink>

        <NavLink to="/dashboard/employee_delivery_man/check_pending_deliveries" className="list-group-item-list-group-item-action">
            Check Pending Deliveries
        </NavLink>

   
      </div>
      </div>
    </>
  )
}

export default DeliveryManMenu