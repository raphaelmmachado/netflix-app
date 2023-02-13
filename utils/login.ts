//firebase
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "./firebaseConfig";
import { getGuestSesssionID, storeSessionId } from "./requestToken";
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const loginWithGoogle = async () => {
  try {
    await getGuestSesssionID()
      .then(
        (res) =>
          res?.guest_session_id && storeSessionId(null, res?.guest_session_id)
      )
      .catch((err) => console.error(err));

    const result = await signInWithPopup(auth, googleProvider);
    return result;
  } catch (error: any) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error?.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    console.error({ errorCode, errorMessage, email, credential });
  }
};
const loginWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    return result;
  } catch (error: any) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error?.customData.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);
    // ...
    console.error(errorCode, errorMessage, email, credential);
  }
};
export { loginWithGoogle, loginWithFacebook };
