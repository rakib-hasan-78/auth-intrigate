import React, { createContext, use, useState } from 'react';
import { toast } from 'react-toastify';
import { registerFirebase } from '../../firebase/Signup/Signup.firebase';

const AuthContext = createContext();
export const useAuth = ()=> use(AuthContext);

const TestContext = ({children}) => {
    const [loader, setLoader] = useState(false);
    // register Handler 
    const signupHandler = (
        e,
        auth,
        email,
        password,
        displayName,
        terms,
        reset) => {
        // stop browser from re-rendering
        e.preventDefault();
        // Loading state true
        setLoader(true);

        if (!terms) {
            setLoader(false);
            return toast.warning(`Please accept T&C.`);
        }
        else {
            // firebase components 
            return registerFirebase(
                auth,
                email,
                password,
                displayName
            ).then(()=>{
                const firstName = displayName.split(' ')[0];
                toast.success(`Hey ${firstName}!! Registration is successful!`);
                reset();
            }).catch((error)=>{
                if (error.code ===`auth/email-already-in-use`) {
                    return toast.warning(`This email is already registered.`)
                } else {
                    return toast.error(`${error.message}`)
                }
            }).finally(()=>{
                setLoader(false);
            })
        }
        
    }

    const value = {loader,signupHandler}
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default TestContext;