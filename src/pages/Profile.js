import React, { useEffect, useState } from 'react'
import './register.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import LoginValidations from '../validations/LoginValidations';

const Profile = () => {

    axios.defaults.withCredentials = true;
    const token = localStorage.getItem('jwttoken');
    const [user, setUser] = useState([]);
    const decodedToken = jwtDecode(token);
    const { productId } = useParams();
    const navigate = useNavigate();
    useEffect(() => {

        const fetchUserData = async (userId) => {
            try {
                const response = await fetch(`http://localhost:4000/users/user/${userId}`, {});
                if (response.ok) {
                    const responseData = await response.json();


                    if (responseData.user) {
                        const userData = responseData.user;
                        setUser(userData);
                        console.log('User Data:', userData);
                        // Do something with the user data
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
        console.log(user.name);

        fetchUserData(decodedToken._id.toString());

    }, [productId]);

    const handleSignOut = () => {
        localStorage.removeItem('jwttoken');

        let path = `/users/login`;
        navigate(path);
    };

    const handleFav = () =>{
        let path = `/favourites`;
        navigate(path);
    }
    return (
        <div className='user-detail'>
            {Object.keys(user).length > 0 ? (
                <div className='user-detail'>
                    <h1> Hello {user.lastName}</h1>
                    <div className='all-userDetail'>
                        <p>
                            <strong>Profile ID:</strong> {user._id}
                        </p>
                        <p>
                            <strong>Name:</strong> {user.firstName} {user.lastName}
                        </p>

                        <p>
                            <strong>Email:</strong> {user.email}
                        </p>
                        <p>
                            <strong>Address:</strong> {user.address}
                        </p>
                        <p>
                            <strong>Phone:</strong> {user.phone}
                        </p>

                    </div>
                        <p className='border'></p>
                    <div className='profile-btns'>

                        <button className='profile favourite' onClick={handleFav}>
                            Favorites
                        </button>
                        <br />
                        <button className='profile signout' onClick={handleSignOut}>
                            Sign Out
                        </button>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )
            }
        </div>

    )

}

export default Profile