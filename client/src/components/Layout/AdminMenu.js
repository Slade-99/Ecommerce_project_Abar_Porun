import React from 'react'

import { NavLink } from 'react-router-dom';
const AdminMenu = () => {
  return (
    <>

    <div className="text-center">
    
      <div className="list-group">
      
        
        <NavLink to="/dashboard/employee_admin/create_category" className="list-group-item-list-group-item-action">
            Create New Category
        </NavLink>
        <NavLink to="/dashboard/employee_admin/create_product" className="list-group-item-list-group-item-action">
            Insert New Product
        </NavLink>
        <NavLink to="/dashboard/employee_admin/product" className="list-group-item-list-group-item-action">
            Products
        </NavLink>
        <NavLink to="/dashboard/employee_admin/sales" className="list-group-item-list-group-item-action">
          Sales Update
        </NavLink>
        <NavLink to="/dashboard/employee_admin/password_update" className="list-group-item-list-group-item-action">
          Customer Password Update
        </NavLink>
        <NavLink to="/dashboard/employee_admin/orders" className="list-group-item-list-group-item-action">
          Update Order Status
        </NavLink>
        <NavLink to="/dashboard/employee_admin/predict_acceptance" className="list-group-item-list-group-item-action">
          Predict Acceptance
        </NavLink>
   
      </div>
      </div>
    </>
  );
}

export default AdminMenu