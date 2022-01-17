import Head from "next/head";
import Image from "next/image";
import FacebookLogo from "../public/facebook.svg";
import { getSession, signIn } from "next-auth/react";

function Login() {
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

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session && session.user) {
    return {
      redirect: {
        permanent: true,
        destination: "/",
      },
      props: {},
    };
  }
  return {
    props: {},
  };
}
