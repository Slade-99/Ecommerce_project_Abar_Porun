import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import SearchInput from './../Form/SearchInput';
import { useCart } from "../../context/cart";
import {Badge} from 'antd';
import useCategory from "../../hooks/useCategory";
const Header = () => {
  const [auth,setAuth] = useAuth();
  const categories = useCategory();
  const [cart]=useCart();
  const handleLogout = ( ) =>{
    setAuth({
      ...auth,user:null,token:'',customer:null,employee:null
    })
    localStorage.removeItem('auth')
  }
  return (
    <>
    <div className="navbar-container">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
               Abar Porun
            </Link>
           
           
           
           
           <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput/>







              




              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              

            {


              auth?.customer?.address ? (<>
              
              <li className="nav-item">
                <NavLink to="/dashboard/customer" className="nav-link ">
                  Dashboard
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/dashboard/customer/yours" className="nav-link ">
                  Recommended For You
                </NavLink>
              </li>
              
              
              
              <li className="nav-item">
                <NavLink onClick={handleLogout} to="/" className="nav-link">
                  Logout
                </NavLink>
              </li>
              
              
              
              
              <li className="nav-item">
                <Badge count={cart?.length} showZero>
                  <NavLink to="/cart" className="nav-link" style={{ fontSize: '18px' }}>
                    Cart 
                  </NavLink>
                </Badge>
              </li>
              
              
              
              
              
              </> ) :auth?.employee?._id ? ( <>
              

                <li className="nav-item">
                <NavLink to="/dashboard/employee_admin" className="nav-link ">
                  Dashboard
                </NavLink>
              </li>
              
              
              
              <li className="nav-item">
                <NavLink onClick={handleLogout} to="/" className="nav-link">
                  Logout
                </NavLink>
              </li>
              
               

                
              
              
              </>):(<>
              
                <li className="nav-item">
                <NavLink to="/" className="nav-link ">
                  Home
                </NavLink>
              </li>
                
                
                <li className="nav-item">
                <NavLink to="/register" className="nav-link">
                  Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              
              </li>
              <li className="nav-item">
                <Badge count={cart?.length} showZero>
                  <NavLink to="/cart" className="nav-link" style={{ fontSize: '18px' }}>
                    Cart 
                  </NavLink>
                </Badge>
              </li>
              
              </>)
            
            
            
            }



              
            </ul>
          </div>
        </div>
      </nav>
      </div>
    </>
  );
};

export default Header;
