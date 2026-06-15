import React, { createContext, use,  useEffect,  useState } from 'react';
import { toast } from 'react-toastify';
import { registerFirebase } from '../../firebase/Signup/Signup.firebase';
import { auth } from '../../firebase/FirebaseInit/Firebase.init';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseSignIn } from '../../firebase/Signin/Signin';
import firebaseSignout from '../../firebase/firebaseSignout/firebaseSignout';
import googleSignIn from '../../firebase/googleSignIn/googleSignIn';


const AuthContext = createContext();
export const useAuth = ()=> use(AuthContext);

const TestContext = ({children}) => {
    const [loader, setLoader] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loginUser, setLoginUser] = useState(null);

    // ** register Handler 
    const signupHandler = (
        e,
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
    // ** login state observer ==> 
   useEffect(() => {
    // set observer 
     const unsubscribe = onAuthStateChanged(auth, (user)=>{
        setLoginUser(user);
        setLoading(false);
     })
   
     return () => {
       unsubscribe()
     }
   }, [])

    // ** signin user 
    
    const signinHandler = (email, password, reset)=>{
        setLoader(true)
        return firebaseSignIn(
            auth, 
            email, 
            password
        ).then((user)=>{
            console.log(user);
             toast.success(
                ` Hello ${
                user.displayName?.split(' ')[0] ||
                'Anonymous'
                }` 
            )
            reset();
            return;
            
        }).catch((error)=>{
            if (error.code) {
                return toast.error(`${error.code.replace('auth/','').replaceAll('-', ' ')}`)
            }
        }).finally(()=>{
            setLoader(false)
        })
    }
    // ** Signin with google Handler 
    const googleHandler = () => {
        setLoader(true);
        return googleSignIn(auth)
                .then((user)=>{
                    const firstName = user.displayName.split(' ')[0];
                    toast.success(`Welcome Back ${firstName}!`)
                })
                .catch(error=>{
                    console.log(error.message)
                })
                .finally(()=>{
                    setLoader(false);
                })
    }
    //** * logout handler 

    const signOut = () => {
        return firebaseSignout(auth)
               .then(()=>{
                toast.success(`sign out successfully!`)
                console.log(`logout clicked...`);
                return
               })
               .catch(error=>{
                console.log(error.message);
                return;
               })
    }
   

    const value = {
        loader,
        loading,
        signupHandler,
        signinHandler, 
        loginUser,
        signOut, 
        googleHandler
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default TestContext;
