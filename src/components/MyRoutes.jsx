import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import ReactDOM from 'react-dom/client';
import Reservations from '../pages/Reservations';
import ErrorPage from '../pages/Error404';
import Jardins from '../pages/Jardins';
import Home from '../pages/Home';
// import Administration from '../pages/Administration';
import PrivateRoute from '../components/PrivateRoute';
import User from '../pages/User';

function RedirectComponent() {
    return null;
}

export default function MyRoutes() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} errorElement={<ErrorPage />} />
                <Route path="/jardins" element={<Jardins />} errorElement={<ErrorPage />} />
                <Route path="/reservations" element={<Reservations />} errorElement={<ErrorPage />} />
                <Route path="/betton" element={<RedirectComponent />} errorElement={<ErrorPage />} />
                <Route 
                    path="/user" 
                    element={<User 
                                show={true} 
                                isLoggedIn={isLoggedIn} 
                                setIsLoggedIn={setIsLoggedIn}
                            />}
                />
                <Route path="/administration" element={<PrivateRoute isLoggedIn={isLoggedIn} />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    );
}

