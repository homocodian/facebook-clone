import Head from "next/head";
import Image from "next/image";
import FacebookLogo from "../public/facebook.svg";
import { signIn } from "next-auth/react";

function Login() {
  return (
    <div>
      <Head>
        <title>login</title>
        <meta name="description" content="login to facebook" />
      </Head>
      <main className="h-screen grid place-items-center">
        <div className="flex flex-col justify-center items-center">
          <Image
            layout="fixed"
            width={200}
            height={200}
            src={FacebookLogo}
            alt="facebook logo"
          />
          <button
            className="text-center text-lg mt-10 px-4 py-2 bg-fb-blue text-white rounded-full"
            onClick={signIn}
          >
            Login to facebook
          </button>
        </div>
      </main>
    </div>
  );
}

export default Login;
