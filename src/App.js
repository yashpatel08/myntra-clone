import './App.css';
// import { CIcon } from '@coreui/icons-react';
// import { cilList, cilShieldAlt } from '@coreui/icons';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import NavBar from './components/Navbar';
import IndexBody from './components/IndexBody';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import React from 'react';
import Product from './pages/Products';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import Sucess from './pages/Sucess';
import Cancel from './pages/Cancel';
import Favorite from './pages/Favorites';
import Footer from './components/footer';

const App = () => {


  return (

    <>


      <BrowserRouter>
        <div className='app-container'>
          <NavBar />
          <div className='content'>

            <Routes>
              <Route exact path='*' element={<IndexBody />} />
              <Route path='/products' element={<Product category="all" customKey="All Products" />} />
              <Route path='/products/gender/men/type/shirt' element={<Product category="gender/men/type/shirt" customKey="Men shirts" />} />
              <Route path='/products/gender/men/type/tshirt' element={<Product category="gender/men/type/tshirt" customKey="Men t-shirts" />} />
              <Route path='/products/gender/men/type/pent' element={<Product category="gender/men/type/pent" customKey="Men pents" />} />
              <Route path='/products/gender/women/type/shirt' element={<Product category="gender/women/type/shirt" customKey="Women shirts" />} />
              <Route path='/products/gender/women/type/tshirt' element={<Product category="gender/women/type/tshirt" customKey="Women t-shirts" />} />
              <Route path='/products/gender/women/type/pent' element={<Product category="gender/women/type/pent" customKey="Women pents" />} />
              <Route path='/products/gender/child/type/shirt' element={<Product category="gender/Children/type/shirt" customKey="Children shirts" />} />
              <Route path='/products/gender/child/type/tshirt' element={<Product category="gender/Children/type/tshirt" customKey="Children t-shirts" />} />
              <Route path='/products/gender/child/type/pent' element={<Product category="gender/Children/type/pent" customKey="Children pents" />} />

              <Route path='/users/login' element={<Login />} />
              <Route path='/products/:productId' element={<ProductDetail />} />
              <Route path='/users/profile' element={<Profile />} />
              <Route path='/users/register' element={<Register />} />
              <Route path='/success' element={<Sucess />} />
              <Route path='/cancel' element={<Cancel />} />
              <Route path='/favourites' element={<Favorite />} />
              <Route path='/cart' element={

                <Cart />

              } />

            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
