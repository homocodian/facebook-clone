import { db } from "../utils/firebase";
import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import Snackbar from "./Snackbar";
import Post from "./Post";
import { useState } from "react";

function Posts({ posts, session }) {
  const [realtimePosts] = useCollection(
    query(collection(db, "posts"), orderBy("timestamp", "desc"))
  );
  const [alert, setAlert] = useState({ open: false, message: "" });

  return (
    <div>
      {posts || realtimePosts ? (
        realtimePosts ? (
          realtimePosts.docs.map((doc) => {
            const data = doc.data();
            return (
              <Post
                key={doc.id}
                id={doc.id}
                profile={data?.profile}
                name={data.name}
                email={data?.email}
                timestamp={data?.timestamp}
                message={data?.message}
                imageUrl={data?.downloadUrl}
                session={session}
                showAlert={setAlert}
              />
            );
          })
        ) : (
          posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              profile={post?.profile}
              name={post.name}
              email={post?.email}
              timestamp={post?.timestamp}
              message={post?.message}
              imageUrl={post?.downloadUrl}
              session={session}
              showAlert={setAlert}
            />
          ))
        )
      ) : (
        <p className="font-medium my-4">No data available to show</p>
      )}
      <Snackbar
        open={alert.open}
        handleClose={setAlert}
        variant="danger"
        text={alert.message}
        title="Alert"
      />
    </div>
  );
}

export default Posts;
