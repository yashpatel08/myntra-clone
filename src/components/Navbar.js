import React , { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import './home.css';
import { Link , useNavigate } from "react-router-dom";

const NavBar = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const token = localStorage.getItem('jwttoken');
    // const decodedToken = jwtDecode(token);
    const navigate = useNavigate();     

    useEffect(() => {

        if(!token){
            let path = `/products`;
            navigate(path);
            return ;
        }

        const decodedToken = jwtDecode(token);


        const fetchUserData = async (userId) => {
          try {
            const response = await fetch(`http://localhost:4000/users/user/${userId}`, {});
            if (response.ok) {
              const responseData = await response.json();
    
              if (responseData.user) {
                const userData = responseData.user;
                setIsAdmin(userData.admin);
                console.log('admin:', userData.admin);
              } else {
                console.error('User not found');
              }
            } else {
              console.error('Error fetching user data:', response.statusText);
            }
          } catch (error) {
            console.error('Error fetching user data:', error.message);
          }
        };
    
        // Call this function with the user ID obtained from the decoded token
        fetchUserData(decodedToken._id.toString());
      
      }, []);
    return (
        <div className='Navbar'>
            <nav className='nav'>
                <p className='title'>Fashion4You</p>
                <div className="products">
                    <Link to="/products" className='all-product'>All Products</Link>
                </div>
                <div className="dropdown" id="dropdown1">

                    <button className="dropbtn" >Men</button>

                    <div className="dropdown-content">
                        <Link to="/products/gender/men/type/shirt">Shirt</Link>
                        <Link to="/products/gender/men/type/tshirt">T-shirt</Link>
                        <Link to="/products/gender/men/type/pent">Pent</Link>
                    </div>
                </div>
                <div className="dropdown" id="dropdown2">
                    <button className="dropbtn">Women</button>

                    <div className="dropdown-content">
                        <Link to="/products/gender/women/type/shirt">Shirt</Link>
                        <Link to="/products/gender/women/type/tshirt">T-shirt</Link>
                        <Link to="/products/gender/women/type/pent">Pent</Link>
                    </div>
                </div>

                <div className="dropdown" id="dropdown3">
                    <button className="dropbtn">Child</button>

                    <div className="dropdown-content">
                        <Link to="/products/gender/child/type/shirt">Shirt</Link>
                        <Link to="/products/gender/child/type/tshirt">T-shirt</Link>
                        <Link to="/products/gender/child/type/pent">Pent</Link>
                    </div>
                </div>

                <div className="rightnav">
                    {isAdmin && (
                        <div className="admin-section">
                            <Link to="/admin/dashboard" className="navbar-links">Admin Dashboard</Link>
                        </div>
                    )}
                    <div className="login">
                        {token ? (
                            <Link to="/users/profile" className="navbar-links">Profile</Link>
                        ) : (
                            <Link to="/users/login" className="navbar-links">Login</Link>
                        )}
                    </div>
                    <div className='cart'>

                        <Link to="/cart" className="navbar-links">Cart</Link>
                    </div>

                    <div className="search">
                        <input className="search" type="text" name="search" id="search"
                            placeholder="Search for products,brands and more" />
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavBar