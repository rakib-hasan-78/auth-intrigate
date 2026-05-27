import {
    createUserWithEmailAndPassword,
    updateProfile
} from "firebase/auth";

import { toast } from "react-toastify";

const signupHandler = (
    e,
    auth,
    email,
    password,
    displayName,
    setLoader,
    reset
) => {

    // prevent reload
    e.preventDefault();

    // loader on
    setLoader(true);

    // signup
    createUserWithEmailAndPassword(
        auth,
        email,
        password
    )

    .then((userCredential) => {

        const user = userCredential.user;

        // update profile
        return updateProfile(user, {
            displayName
        })
        .then(() => {

            console.log(user);

            const toastName =
                displayName.split(" ")[0];

            toast.success(
                `${toastName}!!! Registration Successful.`
            );

            reset();
        });
    })

    .catch((error) => {

        // duplicate email
        if (
            error.code ===
            "auth/email-already-in-use"
        ) {

            toast.warning(
                "This email is already registered."
            );

            return;
        }

        // other errors
        toast.error(error.message);

    })

    .finally(() => {

        // loader off
        setLoader(false);

    });
}

export { signupHandler };