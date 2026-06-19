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
    const [loader, setLoader] = useState({
    email: false,
    google: false,
    signup: false
});
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
        setLoader(prev=>({...prev, signup:true}));

        if (!terms) {
            setLoader(prev=>({...prev, signup:false}));
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
                setLoader(prev=>({...prev, signup:false}));
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
        setLoader(prev=>({...prev, email:true}))
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
            setLoader(prev=>({...prev, email:false}))
        })
    }
    // ** Signin with google Handler 
    const googleHandler = () => {
        setLoader(prev=>({...prev, google:true}));
        return googleSignIn(auth)
                .then((result)=>{
                    const firstName = result.user.displayName.split(' ')[0];
                    toast.success(`Welcome Back ${firstName}!`)
                })
                .catch(error=>{
                    console.log(error.message)
                })
                .finally(()=>{
                    setLoader(prev=>({...prev, google:false}));
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

    useEffect(() => {

console.log(
'USER:',
loginUser
);

}, [loginUser])
   

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
