import Image from "next/image";
import ConfirmDialog from "./ConfirmDialog";
import isOnline from "../utils/checkNetwork";
import replaceURLs from "../utils/replaceURLs";
import { db, storage } from "../utils/firebase";
import { deleteObject, ref } from "firebase/storage";
import { getFormattedDate, getFullDate } from "../utils/dateFormatter";
import { ThumbUpIcon as LikedIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import {
  ShareIcon,
  ThumbUpIcon,
  ChatAltIcon,
  TrashIcon,
} from "@heroicons/react/outline";

function Post({
  id,
  profile,
  name,
  email,
  message,
  timestamp,
  imageUrl,
  session,
  showAlert,
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [likes, setLikes] = useState([]);

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(() => {
    setHasLiked(likes.findIndex((like) => like.id === session.user.uid) !== -1);
  });

  const handleLike = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.name,
      });
    }
  };

  const openModal = () => {
    setIsDialogOpen(true);
  };

  const closeModal = () => {
    setIsDialogOpen(false);
  };

  const onPositivePress = () => {
    deletePost(id, imageUrl, showAlert);
    closeModal();
  };

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md my-6 max-w-[542px]">
      {/* header */}
      <div className="bg-white p-5 rounded-tl-lg rounded-tr-lg">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-5">
            <img
              width={40}
              height={40}
              src={profile}
              alt="profile"
              className="rounded-full"
            />
            <div>
              <p className="font-medium">{name || email}</p>
              <p
                className="text-xs text-fb-secondary-icon 
                hover:underline cursor-pointer"
                title={timestamp && getFullDate(timestamp)}
              >
                {timestamp && getFormattedDate(timestamp)}
              </p>
            </div>
          </div>
          {/* delete post */}
          {session.user.email === email && (
            <>
              <div
                className="p-2 rounded-full cursor-pointer 
              hover:bg-gray-200 group"
                onClick={openModal}
              >
                <TrashIcon
                  className="h-5 text-fb-secondary-icon 
                group-hover:text-red-500"
                />
              </div>
              <ConfirmDialog
                isOpen={isDialogOpen}
                closeModal={closeModal}
                onPositivePress={onPositivePress}
              />
            </>
          )}
        </div>
        {/* message */}
        {message && <p dangerouslySetInnerHTML={replaceURLs(message)} />}
      </div>
      {/* image */}
      {imageUrl && (
        <div className="relative h-[251px] bg-white">
          <Image
            priority
            layout="fill"
            objectFit="cover"
            src={imageUrl}
            alt=""
          />
        </div>
      )}
      {/* footer */}
      <div className="flex items-center justify-between border-t sm:p-1 lg:p-3">
        <div className="post-footer-icon" onClick={handleLike}>
          {hasLiked ? (
            <LikedIcon className="h-5 text-fb-blue" />
          ) : (
            <ThumbUpIcon className="h-5 text-fb-secondary-icon" />
          )}
          <p className="text-xs xs:text-base">Like</p>
          {likes.length > 0 && <span>{likes.length}</span>}
        </div>
        <div className="post-footer-icon">
          <ChatAltIcon className="h-5 text-fb-secondary-icon" />
          <p className="text-xs xs:text-base">comments</p>
        </div>
        <div className="post-footer-icon">
          <ShareIcon className="h-5 text-fb-secondary-icon" />
          <p className="text-xs xs:text-base">Share</p>
        </div>
      </div>
    </div>
  );
}

export default Post;

async function deletePost(id, imageUrl, showAlert) {
  if (!isOnline()) {
    showAlert({ open: true, message: "Check your network connection!" });
    return;
  }
  try {
    await deleteDoc(doc(db, "posts", `${id}`));
    if (imageUrl) {
      await deleteObject(ref(storage, `posts/${id}`));
    }
  } catch (error) {
    showAlert({ open: true, message: "Sothing went wrong, please try later!" });
  }
}
