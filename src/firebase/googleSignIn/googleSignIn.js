import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// getting firebase providers for google 
const googleProvider = new GoogleAuthProvider();

const googleSignIn = (auth) => {
    return signInWithPopup(
        auth, 
        googleProvider
    )
}
export default googleSignIn; 