import React, { useEffect, useState } from 'react';
import '../home.css';
import { useCookies } from 'react-cookie';
import * as icon from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types'
const Products = (props) => {
    const [products, setProducts] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const response = await fetch(`http://localhost:4000/products/${props.category}`);
                const data = await response.json();

                if (response.ok && Array.isArray(data.allProducts)) {
                    setProducts(data.allProducts);
                } else {
                    console.error('Unexpected response:', response);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();


    }, []);
    const routeChange = (productId) => {
        let path = `/products/${productId}`;
        navigate(path);
    }
   
    const cutDescription = (description, wordLimit) => {
        const words = description.split(' ');
        if (words.length <= wordLimit) {
          return description;
        }
        return words.slice(0, wordLimit).join(' ') + '...';
      };

    return (
        
        <div className='products'>

            <p className='title'>
              {props.customKey}
            </p>

            <div className='all-products'>
                <div className='product-card'>
                    {products.map((product) => (
                        <div className='product' onClick={() => routeChange(product._id)}  id={product._id} key={product._id}>
                            <img className='product-img' onClick={() => routeChange(product._id)}  src={product.imageUrl} alt={product.name} />
                            <p className='product-name'>{product.name}</p>
                            <p className='product-description' onClick={() => routeChange(product._id)} > {cutDescription(product.description, 2)}</p>
                            <div className='icons'>
                                <p className='price'>Rs. {product.price}</p>
                                <button className='button'> <CIcon icon={icon.cilHeart} width={20} size='md' /></button>
                                <button className='cart-button' onClick={() => routeChange(product._id)} > <CIcon icon={icon.cilCart} width={20} size='md' /></button>
                            </div>

                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Products