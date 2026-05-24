import React from 'react';
import { Outlet } from 'react-router';
import Nav from './../utilities/Nav/Nav';


const Root = () => {
    return (
        <div className=''>
            <Nav />
            <Outlet/>
        </div>
    );
};

export default Root;