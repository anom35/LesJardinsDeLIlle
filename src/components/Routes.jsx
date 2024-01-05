import React, { useEffect } from 'react'
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Reservations from '../pages/Reservations';
import Home from "../pages/Home"
import ErrorPage from "../pages/Error404"

function RedirectComponent() {

    useEffect(() => { 
        window.location.href = 'https://www.betton.fr/accueil'; 
    }, []);

    return null;
}

// défini les routes, c'ette fonction est appelé dans index.js
export default function Routes() {

    const router = createBrowserRouter([
        { path:"/", element:<Home />, errorElement:<ErrorPage /> },
        { path: "/reservations", element: <Reservations />, errorElement:<ErrorPage /> },
        { path: "/betton", element: <RedirectComponent />, errorElement: <ErrorPage /> },
        { path: "*", element: <ErrorPage /> }
    ]);

    ReactDOM.createRoot(document.getElementById("root")).render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
}