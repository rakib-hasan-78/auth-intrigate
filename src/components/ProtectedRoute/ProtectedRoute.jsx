import React, { useEffect } from 'react';
import { useAuth } from '../TestContest/TestContext';
import { Navigate } from 'react-router';
import Loading from './../Loading/Loading';


const ProtectedRoute = ({children}) => {
    const {loginUser, loading} = useAuth();


    // when loader is true 
    if (loading) return <Loading />

    if(loginUser) return children

    return <Navigate to={'/login'} replace />
};

export default ProtectedRoute;

