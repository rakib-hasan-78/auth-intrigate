import React from 'react';
import { useAuth } from '../TestContest/TestContext';
import { Navigate, useLocation } from 'react-router';
import Loading from './../Loading/Loading';


const ProtectedRoute = ({children}) => {
    const location = useLocation();
    console.log(location);
    const {loginUser, loading} = useAuth();


    // when loader is true 
    if (loading) return <Loading />

    if(loginUser) return children

    return <Navigate state={location?.pathname} to={'/login'} replace/>
};

export default ProtectedRoute;

