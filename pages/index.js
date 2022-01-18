import Head from "next/head";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Feeds from "../components/Feeds";
import Contacts from "../components/Contacts";
import app from "../utils/firebase";
import { getSession } from "next-auth/react";
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore";

export default function Home({ session, posts }) {
  return (
    <div>
      <Head>
        <title>facebook clone</title>
        <meta name="description" content="facebook clone" />
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <header className="sticky top-0 z-50">
        <Header session={session} />
      </header>
      <main>
        <div className="flex justify-between 3xl:justify-center px-2 py-6">
          <Sidebar session={session} />
          <Feeds session={session} posts={posts} />
          <Contacts />
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session || !session.user) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }
  const snapshot = await getDocs(
    query(collection(getFirestore(app), "posts"), orderBy("timestamp", "desc"))
  );
  const posts = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    timestamp: null,
  }));
  return {
    props: {
      session,
      posts,
    },
  };
}
