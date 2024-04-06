import React from 'react'

import { NavLink } from 'react-router-dom';
const UserMenu = () => {
  return (
    <>

    <div className="text-center">
    
      <div className="list-group">
      
        <NavLink to="/dashboard/customer" className="list-group-item-list-group-item-action">
          Dashboard
        </NavLink>
        <NavLink to="/dashboard/customer/profile" className="list-group-item-list-group-item-action">
            Profile
        </NavLink>
        <NavLink to="/dashboard/customer/orders" className="list-group-item-list-group-item-action">
            Orders
        </NavLink>
        

   
      </div>
      </div>
    </>
  );
}

export default UserMenu