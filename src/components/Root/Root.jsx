import React from 'react';
import { Outlet } from 'react-router';
import Nav from './../utilities/Nav/Nav';
import Footer from './../Footer/Footer';
import { ToastContainer } from 'react-toastify';


const Root = () => {
    return (
        <div className='w-full h-screen flex flex-col items-center justify-between'>
            <Nav />
            <Outlet/>
            <ToastContainer
            position='top-center'
            autoClose={3000}
            theme='light'
             />
            <Footer />
        </div>
    );
};

export default Root;
