import { signInWithEmailAndPassword } from "firebase/auth";


const firebaseSignIn = (auth,email, password) => {
    return signInWithEmailAndPassword(
        auth, 
        email, 
        password
    )
    .then((currentUser)=>{
        const user = currentUser.user;
        return user;
    })
}
export {firebaseSignIn};