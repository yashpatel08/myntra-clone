import React from 'react'
import {useNavigate } from "react-router-dom";
import './home.css';

const IndexBody = () => {
    
    const navigate = useNavigate(); 

    const shopClick = ()=> {
        let path = `/products`;
        navigate(path);
        return ;
    };
    return (
        <div>
            <div className='left-right'>
                <div className='left'>
                    <div className='sub-left'>
                        <p>
                            Trendy <h3>Fashion</h3><p> UP TO 50% OFF DON'T MISS THE DEAL</p>
                        </p>
                        <button className='home-btn' onClick={() => shopClick()} >Shop Now</button>
                    </div>
                    <img className='firstimg' src='https://5.imimg.com/data5/SELLER/Default/2020/8/FP/AS/VN/15237173/indian-kurta-clothing-fashion-shirt-mens-short-kurta-cotton-indian-traditional-500x500.jpg' />
                </div>
                <div className='right'>
                    <div className='sub-rig'>
                        <img className='secondimg' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPxzS5FHwxeu-LuMLiMr4nPf85P2nqY7CR4T0J6BiCahpFHGHr7UsHedDnzAADKUdIegg&usqp=CAU' />
                        <img className='secondimg' src='https://hips.hearstapps.com/hmg-prod/images/hailey-bieber-is-seen-in-brooklyn-on-june-15-2022-in-new-news-photo-1657725290.jpg?crop=1.00xw:0.668xh;0,0.0359xh&resize=640:*' />
                    </div>
                    <div className='sub-rig'>
                        <img className='secondimg' src='https://www.outfittrends.com/wp-content/uploads/2015/02/Cute-winter-outfits-for-Job-women.jpg' />
                        <img className='secondimg' src='https://i.pinimg.com/736x/8e/f7/21/8ef721eed4afd7938cb90de806fd076e.jpg' />
                    </div>
                </div>

            </div>

            <div className="categories">
                <a className="category-title">SHOP BY CATEGORY</a><br />


                <ul>
                    <div className="category-items">
                        <li className="category"><img src="Screenshot 2023-03-25 151943.png" className="categories-img" />
                            <p>Kurta Sets</p>
                        </li>
                        <li className="category">

                            <img src="Screenshot 2023-03-25 153106.png" className="categories-img" />
                            <p>Shirts</p>
                        </li>

                        <li className="category">
                            <img src="Screenshot 2023-03-25 154827.png" className="categories-img" />
                            <p>Casual Shoes</p>
                        </li>

                        <li className="category">
                            <img src="Screenshot 2023-03-25 160414.png" className="categories-img" />
                            <p>Trousers</p>
                        </li>


                        <li className="category">
                            <img src="Screenshot 2023-03-25 161102.png" className="categories-img" />
                            <p>Watches</p>
                        </li>
                        <li className="category">
                            <img src="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSAb5SRrgF_ajgwgtOG4bUAcI8z4itoUMEWEsCnUTaEFDmoOWH_qVzTvFo2Z5fFwqFcO3hnX0NGMNG55cmHiGtLjIKKsPrMut6gfgjKr2s&usqp=CAE"
                                className="categories-img" />
                            <p>Hoodies</p>
                        </li><br />
                        <li className="category">
                            <img src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcROnin150T_COsYvd8dJ96itTZn7_V331D2F3ECE74zYoCX5PITT8shjQCKvdeHtQpGNaK27rchQ5Ai7UEvX7cFZlPP4Np9P6mF277JbdxvWMXYzxrY-uaY&usqp=CAE"
                                className="categories-img" />
                            <p>Men Trousers</p>
                        </li>
                        <li className="category">
                            <img src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTdChS4wy21aKRfX4bYi00X4EVZny6eQ4AVsq8ZgWyVrFSz19JMidksD8wLK7h3ZoOG-KpiC5ep5UaI1mBcJf5FCczWUFB_yfwtio4qaZ8&usqp=CAE"
                                className="categories-img" />
                            <p>Co-Ords</p>
                        </li>
                        <li className="category">
                            <img src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTvg9OGAKvfhcu1H10p6RuVEQ_a396-XXGX0TTbDK6d4eFQGrtUBa1yjsWznVHEqHTtR8j5Kz0-D3hzNSPjzjVi4l_sbF4Eo0vOaSb1fgRP0Ea8ESq3PhQzcg&usqp=CAE"
                                className="categories-img" />
                            <p>Co-Ords for Men</p>
                        </li>
                        <li className="category">
                            <img src="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcS8gMz5NZvgykl3AkvffXEWoaWr8XOTmalHNqIL13OGsjOv14qURlbfW7lrH2bbm4_TtQbihR8txcrlpVvtuvh_x_to9PHHnLnKVA3ADzzi&usqp=CAE"
                                className="categories-img" />
                            <p>Baggy Loose Pants</p>
                        </li>
                        <li className="category">
                            <img src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTYYdtQ461RWIDWFvs7zOauR-_GuYSWEvrCcKSP8bAy59Dn49GGPOsjG6j2NYPTHT3IPFsXvkXiUOytHQ7GHKuRsBcGmq2BwfpTvoTh44U&usqp=CAE"
                                className="categories-img" />
                            <p>Sweat Set</p>
                        </li>
                        <li className="category">
                            <img src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSnKf3ZMgXun28g_RlWBU4NeZcU5o4IRe5DjLXhiHYWM1_Tsy8wYw_-z5qhYHVvROXWicVDNettI81bQnAJEkhdW-esOp1R71I78j4ida9wW2475iT_1UE4&usqp=CAE"
                                className="categories-img" />
                            <p>Wome cargo's</p>
                        </li>
                    </div>
                </ul>
            </div>

            <div className="Banner-sidebar Banner-sidebar-collapsed">
                <div className=" Banner-arrow Banner-arrow-collapsed"></div>
                <p className="Banner-sidebar-content">FLAT 20% OFF</p>
            </div>
<section class="featured-products">
    <h2 class="section-title">Featured Products</h2>
    <div class="product-grid">
        <div class="product-item">
            <img src="https://time.com/shopping/static/6bc2ec1bb546ffc204c4e7ef1f6cf2c8/08ebe/outerknown.jpg" alt="Product 1" class="product-image" />
            <h3 class="product-name">Time stamp</h3>
            <p class="product-price">Rs. 800</p>
            <a href="#" class="btn">View Details</a>
        </div>
        <div class="product-item">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2GpDaMiJoT3OAH0BATXvd_EMiC5m6nORxe4p9bZUZ7A&s" alt="Product 3" class="product-image" />
            <h3 class="product-name">Lee shirt</h3>
            <p class="product-price">Rs. 900</p>
            <a href="#" class="btn">View Details</a>
        </div>
        <div class="product-item">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHdwnRDQ-4gN2kNjBc2cDj1-W4I_sqXESbKi77Cs6kspvYQfnLb5L6ACQ8knTXcIJ1NWE&usqp=CAU" alt="Product 2" class="product-image" />
            <h3 class="product-name">Levis jacket</h3>
            <p class="product-price">Rs. 2500</p>
            <a href="#" class="btn">View Details</a>
        </div>
        <div class="product-item">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQLoX004L7uCjlH4q8s5YqWnSi5O1uzlKtlkO5YGqKrw&s" alt="Product 1" class="product-image" />
            <h3 class="product-name">Pepe Jeans</h3>
            <p class="product-price">Rs. 900</p>
            <a href="#" class="btn">View Details</a>
        </div>
    </div>
</section>
        </div>
    )
}

export default IndexBody