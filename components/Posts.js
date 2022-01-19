import Post from "./Post";
import Snackbar from "./Snackbar";
import { db } from "../utils/firebase";
import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useState } from "react";

function Posts({ posts, session }) {
  const [realtimePosts] = useCollection(
    query(collection(db, "posts"), orderBy("timestamp", "desc"))
  );
  const [alert, setAlert] = useState({ open: false, message: "" });

  return (
    <>
      {posts || realtimePosts ? (
        realtimePosts ? (
          realtimePosts.docs.map((doc) => {
            const post = doc.data();
            return (
              <Post
                key={doc.id}
                id={doc.id}
                profile={post.profile}
                name={post.name}
                email={post.email}
                timestamp={post?.timestamp}
                message={post?.message}
                imageUrl={post?.downloadUrl}
                numberofLikes={post?.numberofLikes}
                likedBy={post?.likedBy}
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
              numberofLikes={post?.numberofLikes}
              likedBy={post?.likedBy}
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
    </>
  );
}

export default Posts;
