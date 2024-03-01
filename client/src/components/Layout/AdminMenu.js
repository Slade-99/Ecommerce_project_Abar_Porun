import React from 'react'

import { NavLink } from 'react-router-dom';
const AdminMenu = () => {
  return (
    <>

    <div className="text-center">
    
      <div className="list-group">
      
        <NavLink to="/dashboard/employee_admin" className="list-group-item-list-group-item-action">
          Dashboard
        </NavLink>
        <NavLink to="/dashboard/employee_admin/create_category" className="list-group-item-list-group-item-action">
            Create New Category
        </NavLink>
        <NavLink to="/dashboard/employee_admin/create_product" className="list-group-item-list-group-item-action">
            Insert New Product
        </NavLink>
        <NavLink to="/dashboard/employee_admin/users" className="list-group-item-list-group-item-action">
          Users
        </NavLink>
   
      </div>
      </div>
    </>
  );
}

export default AdminMenu