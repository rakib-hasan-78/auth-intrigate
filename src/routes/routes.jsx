import { Component } from "react";
import Home from "../components/pages/Home/Home"
import Root from "../components/Root/Root"
import Login from './../components/pages/Login/Login';
import Register from './../components/pages/Register/Register';

const rootRoutes = {
    path: '/',
    Component: Root,
    children: [

        {
            index: true,
            Component: Home,
        },
        {
            path:`/login`,
            Component: Login
        },
        {
            path:'/signup',
            Component: Register
        }
    ]
}
export default rootRoutes;