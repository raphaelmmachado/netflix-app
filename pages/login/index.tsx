//next js
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

// cookies
// icons
import GoogleIcon from "../../components/auth/GoogleIcon";
import GithubIcon from "../../components/auth/GithubIcon";
//utils
import NetflixLogo from "../../components/NetflixLogo";

export default function Login() {
  const route = useRouter();

  const bg =
    "https://genotipia.com/wp-content/uploads/2020/04/Netflix-Background-prueba-1-1536x864.jpg";

  return (
    <>
      <Head>
        <title>Netflix - Entrar</title>
        <meta name="description" content="Fake Netflix" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className="grid place-content-center place-items-center
       min-h-screen object-contain relative"
      >
        <Image
          alt="background"
          fill
          priority
          src={bg}
          className="absolute opacity-30"
        />
        <section
          className="flex flex-col justify-around items-center gap-4
       p-12 rounded-md  min-h-[600px] absolute"
        >
          <NetflixLogo width="280" height="150" />
          <h1 className="text-2xl break-words">
            Filmes, séries e muito mais.{" "}
            <span className="text-xl font-normal"> Sem limites.</span>
          </h1>

          <div className="flex flex-col gap-6">
            <button
              onClick={() =>
                import("../../utils/login").then((module) => {
                  module
                    .loginWithGoogle()
                    .then(
                      (res) =>
                        res?.user &&
                        route.push("/").catch((err) => console.error(err))
                    );
                })
              }
              className="bg-white text-black/90 font-bold hover:bg-opacity-80 px-6 py-4
              text-start rounded-md flex justify-between items-center transition-opacity
               ease-in delay-150 mx-8  gap-6"
            >
              <>Entrar com google</> <GoogleIcon width="30" height="30" />
            </button>

            <button
              onClick={() =>
                import("../../utils/login").then((module) => {
                  module.loginWithGithub().then(
                    (res) =>
                      res?.user &&
                      route.push("/").catch((err) => {
                        route.replace("/login");
                        console.error(err);
                      })
                  );
                })
              }
              className="bg-white text-black/90 font-bold hover:bg-opacity-80 px-6 py-4
              text-start rounded-md flex justify-between items-center transition-opacity
               ease-in delay-150 mx-8 gap-6"
            >
              <>Entrar com Github</>
              <GithubIcon width="30" height="30" />
            </button>
          </div>
        </section>
      </main>
      <footer className="font-normal text-sm">
        Para acessar a Netflix Original
        <a
          className="text-red"
          href="https://netflix.com"
          target="_blank"
          rel="noreferrer"
        >
          clique aqui
        </a>{" "}
      </footer>
    </>
  );
}
