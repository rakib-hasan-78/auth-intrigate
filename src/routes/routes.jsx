import { Component } from "react";
import Home from "../components/pages/Home/Home"
import Root from "../components/Root/Root"
import Login from './../components/pages/Login/Login';
import Register from './../components/pages/Register/Register';
import Blog from './../components/pages/Blog/Blog';
import Dashboard from "../components/Dashboard/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import ErrorPage from './../components/pages/ErrorPage/ErrorPage';



const rootRoutes = {
    path: '/',
    Component: Root,
    children: [

        {
            index: true,
            Component: Home,
        },
        {
            path:`/blog`,
            element: <ProtectedRoute>
                        <Blog />
                    </ProtectedRoute>
        },

        {
            path:`/dashboard`,
            element: <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
        },

        {
            path:`/login`,
            Component: Login
        },
        {
            path:'/signup',
            Component: Register
        },
        {
            path: '*',
            Component: ErrorPage
        }
    ]
}
export default rootRoutes;