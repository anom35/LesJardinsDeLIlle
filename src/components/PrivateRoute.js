import React from 'react';
import { Navigate } from 'react-router-dom';
import Administration from '../pages/Administration';

export default function PrivateRoute({ isLoggedIn }) {
    return isLoggedIn ? <Administration /> : Navigate("/");
}

