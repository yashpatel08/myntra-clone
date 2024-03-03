import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import './productdetail.css';
import { useParams, useNavigate } from 'react-router-dom';
import * as icon from '@coreui/icons';
import { jwtDecode } from "jwt-decode";
import CIcon from '@coreui/icons-react';
const mongoose = require('mongoose');

function ProductDetail(props) {

    const navigate = useNavigate();
    const token = localStorage.getItem('jwttoken');
    const [product, setProduct] = useState({});
    const discountPercentage = 10;
    const { productId } = useParams();
    const [userId, setUserId] = useState([]);
    const [cart, setCart] = useState([]);
    const [user, setUser] = useState([]);
    const [selectedSize, setSize] = useState([]);
    const decodedToken = jwtDecode(token);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleSizeClick = (size) => {
        // Set the selected size when a size is clicked
        setSize(size);
    };
    useEffect(() => {
        if (!token) {
            navigate('/users/login');
        }
        const fetchProduct = async () => {

            try {
                const response = await fetch(`http://localhost:4000/products/${productId}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }

                const productData = await response.json();
                console.log('Fetched product:', productData);


                if (Object.keys(productData).length > 0) {
                    setProduct(productData);
                } else {
                    console.error('Empty product data received');
                }
            } catch (error) {
                console.error('Error fetching product details:', error.message);
            }

        };


        fetchProduct();


        const fetchUserData = async (userId) => {
            try {
                const response = await fetch(`http://localhost:4000/users/user/${userId}`, {});
                if (response.ok) {
                    const responseData = await response.json();


                    if (responseData.user) {
                        const userData = responseData.user;
                        setUser(userData);
                        setUserId(userId);
                        console.log('User id:', userId);

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

        // Call this function with the user ID obtained from the decoded token
        fetchUserData(decodedToken._id.toString());

        // const token = localStorage.getItem('token');
        // if (token) {
        //     const decodedUser = jwt.decode(token);
        //     console.log('Decoded user:', decodedUser);

        //     // Make sure the decoded user is not null before setting the user state
        //     if (decodedUser) {
        //         setUser(decodedUser);
        //     } else {
        //         console.error('Error decoding user');
        //     }
        // }


    }, [productId]);

    const discountedPrice = product.product ? (product.product.price - (product.product.price * discountPercentage) / 100) : 0;
    const productPrice = product.product ? product.product.price : 0;

    const addToCart = async () => {
        const { _id, address, firstName } = user;
        console.log('Token:', token);
        console.log("Selected size:", selectedSize);
        if (token) {
            try {

                console.log('Decoded Token:', decodedToken);
                console.log("user name", firstName);
                if (decodedToken && decodedToken._id) {
                    const userId = decodedToken._id.toString();

                    const orderData = {
                        products: [
                            {
                                productId: productId,
                                quantity: 1,

                                name: firstName,
                                price: discountedPrice.toFixed(2),
                            },
                        ],
                        buyer: userId,
                        size: selectedSize,
                        address: address,
                        orderDate: new Date(),
                    };

                    console.log('Order Data:', orderData);
                    console.log('address', address);
                    const response = await Axios.post(
                        'http://localhost:4000/orders/addOrder',
                        orderData,  // send orderData directly
                        {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                            },
                        }
                    );

                    console.log('Response:', response);

                    if (response.data.status === 'success') {
                        console.log('Order placed successfully.');
                    } else {
                        console.error('Order placement failed:', response.data.error);
                    }

                } else {
                    console.error('Invalid or missing user information in the decoded token');
                }
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }

    };

    const handleFavoriteClick = async () => {
        try {
            // Make a request to add the product to favorites
            const response = await Axios.post(`http://localhost:4000/users/${userId}/favorite/${productId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.data.status === 'success') {
                console.log('Product added to favorites successfully.');
                setShowSuccessMessage(true);
                // You may want to update the UI to reflect the change
            } else {
                console.error('Failed to add product to favorites:', response.data.error);
            }
        } catch (error) {
            console.error('Error adding product to favorites:', error);
        }
    };


    return (
        <div className='product-detail'>
            {Object.keys(product).length > 0 ? (
                <div className='detail'>
                    <img className='img-detail' src={product.product.imageUrl} />
                    <div className='all-detail'>
                        {/* <div className='cart-indicator'>{cart.length}</div> */}
                        <h3 className='detail-name'>{product.product.name}</h3>
                        <p className='detail-des'>{product.product.description}</p>
                        <p className='border'></p>

                        <section className='detail-prices'>
                            <p className='discounted-price'>Rs. {discountedPrice.toFixed(2)}
                            </p>
                            <p className='detail-price'>MRP {productPrice} </p>
                            <p className='discount'>({discountPercentage}% OFF)</p>
                        </section>
                        <p>{product.product.color}</p>
                        <h4 className='detail-size'>SELECT SIZE</h4>
                        <div className='detail-sizes'>
                            {product.product.sizes.map((size, index) => (
                                <p
                                    key={index}
                                    className={size === selectedSize ? 'selected' : ''}
                                    onClick={() => handleSizeClick(size)}
                                >
                                    {size}
                                </p>
                            ))}
                        </div>
                        {selectedSize && <p>You selected: {selectedSize}</p>}
                        <div className='detail-icons'>
                            <button className='detail-fav' onClick={() => handleFavoriteClick()}> <CIcon icon={icon.cilHeart} width={20} size='sm' /> WHISHLIST</button>
                            <button className='detail-cart' onClick={addToCart}> <CIcon icon={icon.cilCart} width={20} size='sm' /> ADD TO BAG</button>
                            {/* onClick={() => routeChange(product._id)} */}
                        </div>
                    {showSuccessMessage && (
                        <div className='success-message'>
                            <p>Product added to favorites successfully!</p>
                        </div>
                    )}
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )
            }


        </div>
    )
}

export default ProductDetail