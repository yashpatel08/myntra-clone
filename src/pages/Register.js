import React, { useState } from 'react';
import RegisterValidations from '../validations/RegisterValidations';
import './register.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const Register = () => {

    const [fname, setFname] = useState([]);
    const [lname, setLname] = useState([]);
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);
    const [phone, setPhone] = useState([]);
    const [address, setAddress] = useState([]);


    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/users/login`;
        navigate(path);
    }


    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            await axios.post('http://localhost:4000/users/register', {
               firstName: fname,
               lastName: lname , 
               email, password,phone,address 
            })
                .then(result => console.log(result))
                .catch(err => console.log(err))

            routeChange();
        } catch (e) {
            console.log(e);
        }


    }
    return (
        <div className='register'>
            <form onSubmit={handleSubmit}>
                <div className="register-content">

                    <p className='register-title'>Register</p>


                    <label>First Name</label>
                    <input name='firstName' onChange={(e) => { setFname(e.target.value ) }} placeholder='Enter your first name' type='text' />
                    <label>last Name</label>
                    <input name='lastName' onChange={(e) => { setLname( e.target.value ) }} placeholder='Enter your last name' type='text' />
                    <label>Email</label>
                    <input name='email' onChange={(e) => { setEmail(e.target.value ) }} placeholder='Enter your email' type='email' />
                    <label>Phone</label>
                    <input name='phone' onChange={(e) => { setPhone( e.target.value ) }} pattern='[0-9]' placeholder='Enter number' type='number' />
                    <label>Password</label>
                    <input name='password' onChange={(e) => { setPassword(e.target.value ) }} placeholder='Enter password' type='password' />

                    <label>Address</label>
                    <textarea name='address' onChange={(e) => { setAddress( e.target.value ) }} placeholder='Enter your Address' type='text' />

                    <div className='buttons'>

                        <button className='register-btn'>Register</button>
                        <p>or</p>
                        <button onClick={routeChange} className='login-btn'>Login</button>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default Register;