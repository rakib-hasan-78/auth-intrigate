import { signOut } from "firebase/auth";


const firebaseSignout = (auth) => {
    return signOut(auth)
};

export default firebaseSignout;
