import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import './fav.css';
import { useParams, useNavigate } from 'react-router-dom';

const Favorites = () => {
    const token = localStorage.getItem('jwttoken');
    const [favorites, setFavorites] = useState([]);
    const decodedToken = jwtDecode(token);
    const [product, setProduct] = useState({});
    const { productId } = useParams();
    const [products, setProducts] = useState({});

    useEffect(() => {

        const fetchFavorites = async (userId) => {
            try {
                const response = await fetch(`http://localhost:4000/users/${userId}/favorite`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const responseData = await response.json();

                    if (responseData.favorites) {
                        setFavorites(responseData.favorites);

                        responseData.favorites.forEach((favorite) => {
                            fetchProduct(favorite);
                        });
                    } else {
                        console.error('Favorites not found');
                    }
                } else {
                    console.error('Error fetching favorites:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching favorites:', error.message);
            }
        };



        const fetchProduct = async (productId) => {

            try {
                const response = await fetch(`http://localhost:4000/products/${productId}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }

                const productData = await response.json();
                console.log('Fetched product:', productData);


                if (Object.keys(productData).length > 0) {
                    // setProduct(productData);
                    setProducts((prevProducts) => ({
                        ...prevProducts,
                        [productId]: productData,
                    }));
                } else {
                    console.error('Empty product data received');
                }
            } catch (error) {
                console.error('Error fetching product details:', error.message);
            }

        };



        fetchFavorites(decodedToken._id.toString());

    }, [token, decodedToken._id]);

    return (
        <div className='favourites'>
            <div className='fav-card'>
                <h2 className='fav-title'>Favorites</h2>
                {favorites.length > 0 ? (
                    <div className="fav" id={product._id} key={product._id}>
                    
                        {favorites.map((favorite, index) => (
                            <div key={index} className='favo'>
                                {products[favorite] ? (
                                    <div className='fav-detail'>
                                        <img src={products[favorite].product.imageUrl} className='fav-img' />
                                        <p>{products[favorite].product.name}</p>
                                        <p className="product-description">Description: {products[favorite].product.description}</p>
                                        <p className="price">Rs. {products[favorite].product.price}</p>
                                    </div>
                                ) : (
                                    <p>Loading product details...</p>
                                )}
                            </div>
                        ))}
                    
                    </div>
                ) : (
                    <div className='fav-empty'>
                        <p>No favorites yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorites;
