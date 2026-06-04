import {
    createUserWithEmailAndPassword,
    updateProfile
} from "firebase/auth";
import { useRef } from "react";

import { toast } from "react-toastify";

// const signupHandler = (
//     e,
//     auth,
//     email,
//     password,
//     displayName,
//     setLoader,
//     terms,
//     reset
// ) => {

//     // prevent reload
//     e.preventDefault();

//     if (!terms) {
//         toast.info(`Please Accept T&C.`);
//         return;
//     }

//     // loader on
//     setLoader(true);

//     // signup
//     createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//     )

//     .then((userCredential) => {

//         const user = userCredential.user;

//         // update profile
//         return updateProfile(user, {
//             displayName
//         })
//         .then(() => {

//             console.log(user);

//             const toastName =
//                 displayName.split(" ")[0];

//             toast.success(
//                 `${toastName}!!! Registration Successful.`
//             );

//             reset();
//         });
//     })

//     .catch((error) => {

//         // duplicate email
//         if (
//             error.code ===
//             "auth/email-already-in-use"
//         ) {

//             toast.warning(
//                 "This email is already registered."
//             );

//             return;
//         }

//         // other errors
//         toast.error(error.message);

//     })

//     .finally(() => {

//         // loader off
//         setLoader(false);

//     });
// }

// export { signupHandler };

const registerFirebase = (
    auth,
    email,
    password,
    displayName
    ) => {
    
    return createUserWithEmailAndPassword(
        auth, 
        email, 
        password
        ).then((useRCredential)=>{
            const user = useRCredential.user;
            return updateProfile(user, {
                displayName
            })
        })
    
}
export {registerFirebase};