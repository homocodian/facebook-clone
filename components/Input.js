import Loader from "./Loader";
import Snackabr from "./Snackbar";
import filterWords from "../utils/filterWords";
import isOnline from "../utils/checkNetwork";
import { VideoCameraIcon, PhotographIcon, XIcon } from "@heroicons/react/solid";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { useRef, useState } from "react";
import { db, storage } from "../utils/firebase";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import {
  addDoc,
  serverTimestamp,
  collection,
  doc,
  setDoc,
} from "firebase/firestore";

function Input({ session }) {
  const inputRef = useRef(null);
  const filePickerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [imageToPost, setImageToPost] = useState(null);
  const [alert, setAlert] = useState({ open: false, message: "" });

  const uploadPost = async (e) => {
    e.preventDefault();
    if (!isOnline()) {
      setAlert({ open: true, message: "Check your network connection!" });
      return;
    }
    if (!inputRef.current.value && !imageToPost) return;
    setLoading(true);
    try {
      const filteredWords =
        inputRef.current.value !== ""
          ? filterWords.clean(inputRef.current?.value)
          : null;
      const { id } = await addDoc(collection(db, "posts"), {
        name: session.user?.name,
        email: session.user?.email,
        profile: session.user?.image,
        message: filteredWords,
        timestamp: serverTimestamp(),
      });
      if (imageToPost) {
        const uploadTask = await uploadString(
          ref(storage, `posts/${id}`),
          imageToPost,
          "data_url"
        );
        const downloadUrl = await getDownloadURL(uploadTask.ref);
        await setDoc(
          doc(db, "posts", `${id}`),
          { downloadUrl },
          { merge: true }
        );
      }
    } catch (error) {
      setAlert({
        open: true,
        message: "Sothing went wrong, please try later!",
      });
    }
    inputRef.current.value = "";
    removeImage();
    setLoading(false);
  };

  const readImage = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
    e.target.value = null;
  };

  const removeImage = () => setImageToPost(null);

  return (
    <>
      <div
        className="relative bg-white shadow-md rounded-lg p-3 sm:p-5 
        pb-0 text-gray-500 max-w-[542px]"
      >
        {/* message */}
        <div className="flex items-center space-x-2">
          <img
            width={40}
            height={40}
            src={session?.user?.image}
            alt="profile"
            className="rounded-full"
          />
          <form className="flex flex-1">
            <input
              type="text"
              ref={inputRef}
              name="message"
              autoComplete="off"
              placeholder={`whats on your mind, ${
                session.user?.name.split(" ")[0]
              }?`}
              className="outline-none h-10 bg-gray-100 
              rounded-full px-4 sm:px-4 w-[100%] sm:flex-row"
            />
            {imageToPost && (
              <div
                aria-label="image preview"
                className="relative hover:brightness-110 transition
                duration-150 transform hover:scale-105 cursor-pointer"
              >
                <img src={imageToPost} alt="" className="h-10 object-contain" />
                <span
                  aria-label="remove image"
                  onClick={removeImage}
                  className="absolute top-0 right-0 bg-transparent"
                  title="remove"
                >
                  <XIcon className="h-5 text-fb-secondary-icon" />
                </span>
              </div>
            )}
            <button hidden type="submit" onClick={uploadPost} />
          </form>
        </div>

        {/* actions */}
        <div
          className="flex items-center justify-evenly 
          border-t p-3 sm:pb-0 mt-4"
        >
          <div className="input-icon">
            <VideoCameraIcon className="h-5 text-red-500" />
            <p className="input-icon-text">live video</p>
          </div>
          <div
            className="input-icon"
            onClick={() => filePickerRef.current.click()}
          >
            <PhotographIcon className="h-5 text-green-500" />
            <p className="input-icon-text">photo/video</p>
            <input
              ref={filePickerRef}
              onChange={readImage}
              type="file"
              name="photo"
              id="photo"
              hidden
              accept="image/*"
            />
          </div>
          <div className="input-icon">
            <EmojiHappyIcon className="h-5 text-yellow-500" />
            <p className="input-icon-text">feeling/activity</p>
          </div>
        </div>
        {loading && (
          <div
            className="absolute z-50 top-0 left-0 right-0 bottom-0 
          bg-gray-100 opacity-70 grid place-items-center"
          >
            <Loader />
          </div>
        )}
      </div>
      <Snackabr
        open={alert.open}
        variant={"Alert"}
        title="Alert"
        text={alert.message}
        handleClose={setAlert}
      />
    </>
  );
}

export default Input;
