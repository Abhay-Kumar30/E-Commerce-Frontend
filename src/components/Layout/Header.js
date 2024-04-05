import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { useNavigate } from "react-router-dom";

const Header = () => {

  const [auth,setAuth]=useAuth();
  const [cart]=useCart();
  const categories=useCategory();
  const navigate =useNavigate();

  const handleLogout =()=>{

     // delete the "auth" variable from local storage 
     // and ramove "logout button" from nav bar and visible the register and login button
     setAuth({ ...auth,user:null, tokem:" " });

     localStorage.removeItem('auth');
     localStorage.removeItem('cart');
   
     toast.success("Logout Successfully");
     navigate("/")

     window.location.reload();
  }
  
  return (
    <>
      <nav className="navbar navbar-expand-lg">
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
            <span className="navbar-toggler-icon " />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand"> Ecommerce App </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">          
                 <SearchInput/>        
                 <li className="nav-item">
                   <NavLink to="/" className="nav-link "> Home </NavLink>
                 </li>
                 

               {!auth?.user ? (
                 <>
                   <li className="nav-item">
                     <NavLink to="/register" className="nav-link"> Register </NavLink>
                   </li>
                   <li className="nav-item">
                     <NavLink to="/login" className="nav-link"> Login </NavLink>
                   </li> </>

                   ) : (

                  <>
                  <li className="nav-item dropdown">
                      <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {auth?.user?.name}
                      </NavLink>
                      <ul className="dropdown-menu">

                      {/* // here we visit at /dashboard then we check person is "admin" or "user" 
                          if the person is "admin" then we redirrect to "to=/dashboard/admin" url 
                          if the person is "user" then we redirect to "to=/dashboard/user" url */}
                        <li><NavLink to ={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="dropdown-item" href="#">Dashboard</NavLink></li>
                        <li><NavLink to="/login" onClick={handleLogout} className="nav-link dropdown-item logout">Logout</NavLink></li>
                      </ul>
                  </li>

                  <li className="nav-item">
                     <NavLink to="/cart" className="nav-link"> Cart {cart?.length} </NavLink>
                  </li>

                  </>
                  )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;