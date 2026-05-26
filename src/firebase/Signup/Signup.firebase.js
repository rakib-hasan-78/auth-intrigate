import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";

const signupHandler = (e, auth, email, password, displayName,setLoader)=>{
    // preventing browser loading
    e.preventDefault();

    // signup method 
    try {   
            // loader spinning start
            setLoader(true);
            // initiating firebase to signup
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential)=>{
                    const user = userCredential.user;
                    console.log(user);
                    updateProfile(user,{
                        displayName: displayName
                    })
                })
                const toastName = displayName.split(' ')[0];
                toast.success(`${toastName}!!! Registration Successfully.`);

    }
    catch(error){
        toast.warning(`${error.message}`);
        return;
    }
    finally {
        // loader spinning off
        setLoader(false);
    }
        
    
}
export {signupHandler}