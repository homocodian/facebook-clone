import Story from "./Story";
import stories from "../utils/userData";
import Image from "next/image";
import { PlusIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { ChevronRightIcon } from "@heroicons/react/outline";

function Stories({ session }) {
  return (
    <div className="relative w-fit flex items-center justify-center gap-1 sm:gap-2 md:gap-4 pb-4">
      <div className="relative cursor-pointer sm:bg-white sm:shadow-md w-12 h-12 sm:w-24 sm:h-36 lg:w-28 lg:h-48 rounded-xl">
        <div className="hidden relative sm:block w-full h-24 lg:h-36">
          <Image
            layout="fill"
            objectFit="cover"
            alt=""
            src={session.user?.image}
            blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAALklEQVR42u3NMQ0AMAgAsOE/e0iQhxdkwNEaaPysfgtCLBaLxWKxWCwWi8V34wFLJE0dc1tGZwAAAABJRU5ErkJggg=="
            className="rounded-tl-xl rounded-tr-xl opacity-95 hover:opacity-70"
          />
        </div>
        <div className="w-full h-full sm:w-8 sm:h-8 sm:absolute top-20 lg:top-32 left-1/2 sm:transform sm:-translate-x-1/2 rounded-full bg-fb-blue inline-flex justify-center items-center">
          <PlusIcon className="h-7 text-white text-center" />
        </div>
        <div className="hidden sm:block">
          <p className="absolute bottom-2 left-1 right-1 text-sm text-center capitalize font-semibold">
            create story
          </p>
        </div>
      </div>
      {stories.map((user) => (
        <Story
          key={user.name}
          src={user.src}
          avatar={user.avatar}
          name={user.name}
        />
      ))}
      <div className="absolute cursor-pointer -right-3 flex items-center justify-center bg-white shadow-lg w-8 h-8 rounded-full">
        <ChevronRightIcon className="h-5 text-fb-secondary-icon" />
      </div>
    </div>
  );
}

export default Stories;
