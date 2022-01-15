import Image from "next/image";
import ConfirmDialog from "./ConfirmDialog";
import replaceURLs from "../utils/replaceURLs";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../utils/firebase";
import { deleteObject, ref } from "firebase/storage";
import { getFormattedDate, getFullDate } from "../utils/dateFormatter";
import {
  ShareIcon,
  ThumbUpIcon,
  ChatAltIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { useState } from "react";
import isOnline from "../utils/checkNetwork";

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
            <Image
              layout="fixed"
              width={40}
              height={40}
              src={profile ? profile : ""}
              alt=""
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
      <div className="flex items-center justify-between border-t p-3 mt-4">
        <div className="post-footer-icon">
          <ThumbUpIcon className="h-5 text-fb-secondary-icon" />
          <p className="text-xs xs:text-base">Like</p>
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
    showAlert({ open: true, message: "Unable to delete post" });
  }
}
