import React from 'react';
import { Link } from 'react-router';
import { useToggle } from '../../../customhooks/toggle/toggle';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import useDataPicker from '../../../customhooks/dataPicker/dataPicker';
import { useAuth } from './../../TestContest/TestContext';


const Register = () => {
    const [eye, setEye] = useToggle();
    const {signupHandler, loader} = useAuth()
    const [data, setData, reset] = useDataPicker({
        displayName: '', email: '', password: '', terms: false
    })
    const registerHandler = e=>{
        signupHandler(
            e,
            data.email,
            data.password,
            data.displayName, 
            data.terms, 
            reset)
    }
    return (
        <div
        className='w-full min-h-full flex flex-col items-center justify-center'
        >
            
            <form  
            className='w-5/12 flex items-center justify-center'
            onSubmit={(e)=>registerHandler(e)}
            >
                        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                            <div className="card-body">
                                <fieldset className="fieldset">
                                    <label className="label">Full Name</label>
                                    <input type="text" className="input" placeholder="Name" name='displayName'
                                    value={data.displayName}
                                    onChange={(e)=> setData(e.target.name, e.target.value)}
                                    />

                                    <label className="label">Email</label>
                                    <input type="email" className="input" placeholder="Email" name='email'
                                    value={data.email}
                                    onChange={(e)=> setData(e.target.name, e.target.value)}  
                                    />
                                    <label className="label">Password</label>
                                    <div className='relative'>

                                    <input className="input" placeholder="Password" name='password'
                                    type={eye ? 'text' : 'password'} 
                                    value={data.password}
                                    onChange={(e)=>setData(e.target.name, e.target.value)}  
                                    />
                                    <span
                                    className='absolute top-1/2 -translate-y-1/2 -translate-x-4 right-0 w-6 h-6 font-extralight text-xl cursor-pointer' 
                                    onClick={setEye}
                                    >
                                    {eye ?  <VscEyeClosed className='text-gray-500' /> :
                                    <VscEye className='text-gray-400' />  }
                                    </span>
                                    </div>
                                    <div>
                                        <label className="label">
                                        <input type="checkbox"
                                         name='terms' className="checkbox" 
                                         value={data.terms}
                                        onChange={(e)=>setData(e.target.name, e.target.checked)} 
                                         />
                                        Accept our T&C.
                                        </label>
                                    </div>
                                    <button 
                                    type='submit' 
                                    className="btn btn-neutral mt-4btn btn-neutral mt-4 w-full flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed"
                                    disabled={loader}
                                    >

                                    {loader ? 
                                
                                    <p className='text-secondary'><span className="loading loading-spinner text-secondary">   </span> Loading.... </p> 
                                    :`Register Now`}

                                    </button>
                                    <p className='text-xs font-light'>Already Have An Account?<span className='text-blue-400 mx-2 font-bold'>  <Link to={`/login`}>  Log In</Link>
                                    </span>  
                                     </p>
                                </fieldset>
                                
                            </div>
                        </div>
                </form>

        </div>
    );
};

export default Register;
