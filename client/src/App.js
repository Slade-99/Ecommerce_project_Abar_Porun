import {Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import Pagenotfound from './pages/Pagenotfound';
import About from './pages/About';
import Contact from './pages/Contact';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/user/dashboard';
import PrivateRoute from './components/Routes/Private';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Employee/AdminDashboard';
import Communication_Officer_Dashboard from './pages/Employee/Communication_Officer_Dashboard';
import Delivery_Man_Dashboard from './pages/Employee/Delivery_Man_Dashboard';
import Communication_Officer_Route from './components/Routes/Communication_Officer_Route';
import Delivery_Man_Route from './components/Routes/Delivery_Man_Route';
import CreateCategory from './pages/Employee/Create_Category';
import CreateProduct from './pages/Employee/Create_Product';
import Users from './pages/Employee/Users';

import Profile from './pages/user/profile';
import Check_Pending_Deliveries from './pages/Employee/Check_Pending_Deliveries';
import Check_Conversations from './pages/Employee/Check_Conversations';
import Products from './pages/Employee/Products';
import Sales from './pages/Employee/Sales';
import UpdateProduct from './pages/Employee/UpdateProduct';
import ForgotPasssword from './pages/Auth/ForgotPassword';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import PasswordUpdate from './pages/Employee/PasswordUpdate';
import CartPage from './pages/CartPage';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import Orders from './pages/user/orders';
import AdminOrders from './pages/Employee/AdminOrders';
import Reviews from './pages/user/Reviews';
import Yours from './pages/user/Yours';

function App() {
  return (
    <>
   <Routes>


    <Route  path='/' element={<HomePage/>}/>
    <Route  path='/product/:slug' element={<ProductDetails/>}/>
    <Route  path='/categories' element={<Categories/>}/>
    <Route path="/category/:slug" element={<CategoryProduct />} />
    <Route path="/cart" element={<CartPage/>}/>
    <Route path="/search" element={<Search/>}/>
    
    <Route path="/forgot-password" element={<ForgotPasssword />} />
    
    
    <Route  path='/dashboard' element={<PrivateRoute/>}>
    <Route  path='customer/profile' element={<Profile/>}/>
    <Route  path='customer/yours' element={<Yours/>}/>
    <Route  path='customer/orders' element={<Orders/>}/>
    <Route  path='customer/reviews' element={<Reviews/>}/>
    <Route  path='customer' element={<Dashboard/>}/>
    </Route>
    
    

    <Route  path='/dashboard' element={<AdminRoute/>}>
    <Route  path='employee_admin' element={<AdminDashboard/>}/>
    <Route  path='employee_admin/create_category' element={<CreateCategory/>}/>
    <Route  path='employee_admin/create_product' element={<CreateProduct/>}/>
    <Route  path='employee_admin/product' element={<Products/>}/>
    <Route  path='employee_admin/product/update-product/:slug' element={<UpdateProduct/>}/>
    <Route  path='employee_admin/users' element={<Users/>}/>
    <Route  path='employee_admin/orders' element={<AdminOrders/>}/>
    <Route  path='employee_admin/sales' element={<Sales/>}/>
    <Route  path='employee_admin/password_update' element={<PasswordUpdate/>}/>
    </Route>


    <Route  path='/dashboard' element={<Communication_Officer_Route/>}>
    <Route  path='employee_communication_officer' element={<Communication_Officer_Dashboard/>}/>
    <Route  path='employee_communication_officer/check_conversations' element={<Check_Conversations/>}/>
    </Route>


    <Route  path='/dashboard' element={<Delivery_Man_Route/>}>
    <Route  path='employee_delivery_man' element={<Delivery_Man_Dashboard/>}/>
    <Route  path='employee_delivery_man/check_pending_deliveries' element={<Check_Pending_Deliveries/>}/>
    </Route>
    
    
    <Route  path='/register' element={<Register/>}/>
    <Route  path='/login' element={<Login/>}/>
    
    <Route  path='/about' element={<About/>}/>
    <Route  path='/contact' element={<Contact/>}/>
    <Route  path='*' element={<Pagenotfound/>}/>
    

    

   </Routes>
    

    
     
    </>
  );
}

export default App;
