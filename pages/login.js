import Head from "next/head";
import Image from "next/image";
import FacebookLogo from "../public/facebook.svg";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

function Login() {
  const router = useRouter();
  const session = useSession();
  useEffect(() => {
    if (session.status === "authenticated" && session.data) {
      router.replace("/");
    }
    console.log(session.data);
  }, [session]);

  return (
    <div>
      <Head>
        <title>login</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        <meta name="description" content="login to facebook" />
      </Head>
      <main className="h-screen grid place-items-center">
        <div className="flex flex-col justify-center items-center">
          <Image
            priority
            layout="fixed"
            width={200}
            height={200}
            src={FacebookLogo}
            alt="facebook logo"
          />
          <button
            disabled={session.status === "loading" ? true : false}
            className="text-center text-lg mt-10 px-4 py-2 bg-fb-blue text-white rounded-full"
            onClick={signIn}
          >
            {session.status === "loading"
              ? "Loading please wait..."
              : "Login to facebook clone"}
          </button>
        </div>
      </main>
    </div>
  );
}

export default Login;
