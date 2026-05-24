import React from 'react';
import { Link } from 'react-router';

const Login = () => {
    return (
        <div className='w-full min-h-full flex flex-col items-center justify-center my-10'>
            <form  action="#">
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-5">
                
                <p className='text-center'>please log in your account</p>

                <label className="label">Email</label>
                <input name='email' type="email" className="input" placeholder="Email" />

                <label className="label">Password</label>
                <input  type="password" name='password' className="input" placeholder="Password" />

                <button 
                type='submit' 
                className="btn btn-neutral mt-4btn btn-neutral mt-4 w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                
                >

                `Log In`

                </button>
                    <div>
                        <a className="link link-hover">Forgot password?</a>
                    </div>
                    <div>
                        <p className="link link-hover text-xs">No account yet?  <span className='text-blue-400 font-bold mx-1'> <Link to={`/signup`} >   sign up </Link></span> </p>
                    </div>
                </fieldset>
            </form>
        </div>
    );
};

export default Login;
