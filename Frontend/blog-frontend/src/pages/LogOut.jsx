import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Remove cookies on logout
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');

        // Redirect to home page or login page
        navigate('/');
    }, [navigate]);

    // return <div>Logging out...</div>; // Optionally display a message or spinner
};

export default LogOut;
