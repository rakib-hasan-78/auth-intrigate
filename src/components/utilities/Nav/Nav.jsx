import React from 'react';
import { Link, NavLink } from 'react-router';
import { useAuth } from '../../TestContest/TestContext';

const Nav = () => {
  const {loginUser, signOut} = useAuth();
  const avatar =
  loginUser?.photoURL ||
  "https://i.ibb.co/placeholder-avatar.png";

  const links = <>
          <li> <NavLink to={`/`}>home</NavLink></li>
          {
            loginUser && <>
            <li> <NavLink to={`/blog`}>blog</NavLink></li>

            </>
          }
          <li> <NavLink to={`/dashboard`}>dashboard</NavLink></li>
          <li> <NavLink to={`/login`}>login</NavLink>  </li>
          <li> <NavLink to={`/signup`}>signup</NavLink>  </li>

  </>
    return (
        <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> 
        </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {links}
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {links}
    </ul>
  </div>
  <div className="navbar-end">
    {
      loginUser ?
      <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={
                  avatar
            } />
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <div className='flex flex-col content-center items-center'>
          <img
          className='rounded-full w-16 h-16 p-0.5'
           src={avatar} 
            alt={loginUser?.displayName} />
            <h4>{loginUser?.displayName}</h4>
            <span 
            className='text-[10px] lowercase text-blue-800 font-bold'>
            {loginUser.email}
            </span>
        </div>
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li onClick={signOut}><a>Logout</a></li>
      </ul>
      </div>
      :
      <Link to={'/login'} >
       login 
      </Link>

    }
  </div>


</div>
    );
};

export default Nav;

