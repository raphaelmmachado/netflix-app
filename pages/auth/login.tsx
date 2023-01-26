import Image from "next/image";
import GoogleIcon from "../../components/auth/GoogleIcon";
import FacebookIcon from "../../components/auth/FacebookIcon";
import { useRouter } from "next/router";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { auth, app } from "../../utils/firebaseConfig";

export default function Login() {
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const route = useRouter();

  const loginWithGoogle = async () => {
    try {
      const analytics = getAnalytics(app);
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result);
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
      console.error(errorCode, errorMessage, email, credential);
    }
  };
  const loginWithFacebook = async () => {
    try {
      const analytics = getAnalytics(app);
      const result = await signInWithPopup(auth, facebookProvider);
      console.log(result);
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
  //TODO ENVIRONMENTS VARIABLES VERCEL
  return (
    <main className="grid place-content-center place-items-center min-h-screen">
      <section className="flex flex-col justify-around gap-4 p-16  rounded-md  bg-gray/5 min-h-[600px]">
        <Image
          src={"/assets/NetflixLogoSvg.svg"}
          width={280}
          height={150}
          alt="netflix-logo"
          className="self-center object-cover "
        />

        <div className="flex flex-col gap-6">
          <button
            onClick={() =>
              loginWithGoogle().then((res) =>
                route.push("/").catch((err) => console.error(err))
              )
            }
            className="socials-buttons "
          >
            Entrar com google <GoogleIcon width="30" height="30" />
          </button>
          <button
            onClick={() =>
              loginWithFacebook().then((res) =>
                route.push("/").catch((err) => console.error(err))
              )
            }
            className="socials-buttons"
          >
            Entrar com Facebook <FacebookIcon width="30" height="30" />
          </button>
        </div>
      </section>
    </main>
  );
}
