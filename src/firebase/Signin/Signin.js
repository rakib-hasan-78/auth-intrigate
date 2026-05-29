import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

const signinHandler = (e,auth, email,password,reset,setLoader) => {
    // prevent default loading behavior;
    e.preventDefault();
    // loading ....
    setLoader(true);
    
    //  Firebase login method
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            const user = userCredential.user;
            const userName = user.displayName;

            const firstName = userName.split(' ')[0];

            toast.success(`Welcome ${firstName}!`);
            reset();
            return;
        })
        .catch(error =>{
            toast.warning(`${error.message}`);
            return;
        })
        .finally(()=>{
            setLoader(false);
        })


}
export {signinHandler};