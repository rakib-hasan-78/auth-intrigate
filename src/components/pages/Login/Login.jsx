import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useToggle } from '../../../customhooks/toggle/toggle';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import useDataPicker from '../../../customhooks/dataPicker/dataPicker';
import { useAuth } from '../../TestContest/TestContext';




const Login = () => {
    const location = useLocation();
    console.log(location);
    const navigate = useNavigate();
    console.log(navigate);
    const [toggle, toggleHandler] = useToggle();
    const [data, setData, reset] = useDataPicker({
        email:'', password:''
    });
    const {signinHandler, loader} = useAuth();
    
    const loginHandler = (e)=>{
        e.preventDefault();
        signinHandler(data.email, data.password, reset)
        .then(()=>{
            
                navigate(
                    location.state || '/',
                    {
                        replace: true
                    }
                );
        })
        
    }

    
    return (
        <div className='w-full min-h-full flex flex-col items-center justify-center'>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-5">
            <form onSubmit={(e)=>loginHandler(e)}  action="#">
                
                <p className='text-center'>please log in your account</p>

                <label className="label">{`Email`}</label>
                <input value={data.email} name='email' type="email" className="input" placeholder={`xample@xmple.com`}
                onChange={(e)=>setData(e.target.name, e.target.value)}
                />

                <label className="label">Password</label>
                <div className='relative'>

                <input 
                className="input" 
                placeholder="Password" 
                name='password'
                type={toggle ? 'text' : 'password'}
                value={data.password}
                onChange={(e)=>setData(e.target.name, e.target.value)}   
                />
                <span
                className='absolute top-1/2 -translate-y-1/2 -translate-x-4 right-0 w-6 h-6 font-extralight text-xl cursor-pointer' 
                onClick={toggleHandler}
                >
                { 
                    toggle ? <VscEyeClosed className='text-gray-500' /> : 
                            <VscEye className='text-gray-500' />
                }
                </span>
                </div>

                <button 
                type='submit' 
                className="btn btn-neutral mt-4btn btn-neutral mt-4 w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={loader}
                >
                {
                    loader ?
                    <p 
                    className='text-secondary'>
                    <span className='loading loading-spinner text-secondary'></span>
                    Checking....!    
                    </p>

                    :

                    `Login`
                }
                </button>
            </form>
                <button
                 className="btn bg-white text-black border-[#e5e5e5] disabled:opacity-60 disabled:cursor-not-allowed">
                 {
                    loader ?
                    <p 
                    className='text-secondary'>
                    <span className='loading loading-spinner text-secondary'></span>
                    Checking....!    
                    </p>
                    :
                     <span className='flex items-center space-x-2'>
                        <span>
                            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>

                        </span>
                        <span>
                        Login with Google
                        </span>
                    </span>

                 }
                </button>
                    <div>
                        <a className="link link-hover">Forgot password?</a>
                    </div>
                    <div>
                        <p className="link link-hover text-xs">No account yet?  <span className='text-blue-400 font-bold mx-1'> <Link to={`/signup`} >   sign up </Link></span> </p>
                    </div>
                </fieldset>
        </div>
    );
};

export default Login;



