import React, { useEffect, useState } from 'react';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { loadUser } from './actions/userActions';
import LoginSignup from './Components/Auth/LoginSignup';
import Profile from './Components/Auth/Profile';
import Home from './Components/Home/Home';
import Footer from './Components/Layout/Footer/Footer';
import Header from './Components/Layout/Header/Header';
import ProductDetails from './Components/Products/ProductDetails';
import Products from './Components/Products/Products';
import Search from './Components/Products/Search';
import store from './store';

function App() {
    const [theme, setTheme] = useState(null);
    const { isAuthenticate, user } = useSelector((state) => state.user);

    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme:dark)').matches) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }, []);

    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const handleTheme = () => {
        setTheme((prvTheme) => (prvTheme === 'dark' ? 'light' : 'dark'));
    };
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/account"
                    element={isAuthenticate ? <Profile user={user} /> : <Navigate to="/auth" />}
                />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/products" element={<Products />} />
                <Route path="/search" element={<Search />} />
                <Route path="/auth" element={<LoginSignup />} />
            </Routes>
            <Footer />
            <button
                type="button"
                className="bg-blue-900 shadow-sm shadow-gray-700 dark:shadow-white py-1 px-2 rounded-full w-8 h-8 fixed top-10 right-10 z-50"
                onClick={handleTheme}>
                {theme === 'dark' ? (
                    <BsFillMoonFill className="text-amber-500" />
                ) : (
                    <BsFillSunFill className="text-amber-500" />
                )}
            </button>
        </div>
    );
}

export default App;
