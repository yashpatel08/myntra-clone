import React, { useState } from 'react'
import './register.css';

import { useNavigate } from "react-router-dom";
import axios from 'axios';
import LoginValidations from '../validations/LoginValidations';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    axios.defaults.withCredentials = true;
    const routeChange = () => {
        let path = `/users/register`;
        navigate(path);
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        await LoginValidations.validate({ email, password });

        try {
            const response = await axios.post('http://localhost:4000/users/login', {
                email, password
            });

            console.log(response);


            if (response.data.status === 'success') {
                const token = response.data.accesstoken;

                if (token) {
                    // Log token and save it to localStorage
                    console.log('Token from response:', token);
                    localStorage.setItem('jwttoken', token);

                    // Log token from localStorage
                    console.log('Token saved in localStorage:', localStorage.getItem('jwttoken'));

                    // Log other details and perform actions
                    console.log('Login successful');
                    console.log('Current User:', response.data.currentUser);

                    // You can set the user state or perform other actions here
                    // setUser(response.data.currentUser);

                    alert('Login Successful');
                    // Redirect or perform other actions
                    navigate('/products');
                } else {
                    // Log if token is undefined in the response
                    console.error('Token is undefined in the response');
                }
            }
            else {
                console.log('Login unsuccessful:', response.data.message);
                alert('Please check your username and password');
            }

        } catch (e) {
            if (e.response) {

                console.log('Error during login:', e.response.data);
                console.log('Status code:', e.response.status);
            } else if (e.request) {

                console.log('Error during login: No response received');
            } else {

                console.log('Error during login:', e.message);
            }
        }


    }
    return (
        <div className='Login'>
            <form onSubmit={handleSubmit}>
                <div className="login-content">

                    <p className='login-title'>Login</p>
                    <label>Email</label>
                    <input name='email' onChange={(e) => { setEmail(e.target.value) }} placeholder='Enter your email' type='text' />

                    <label>Password</label>
                    <input name='password' onChange={(e) => { setPassword(e.target.value) }} placeholder='Enter password' type='password' />
                    <div className='buttons'>
                        <button className='login-button'>Login</button>
                        <p>or</p>
                        <button onClick={routeChange} className='register-button'>Register</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login