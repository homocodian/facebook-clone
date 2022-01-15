import { SearchIcon } from "@heroicons/react/outline";
import { DotsVerticalIcon, VideoCameraIcon } from "@heroicons/react/solid";
import Image from "next/image";
import ActiveUsers from "../utils/userData";

function Contacts() {
  return (
    <div className="hidden lg:flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="text-gray-500 text-lg font-semibold">Contacts</p>
        <div className="flex items-center justify-between">
          <span className="p-2 hover:bg-gray-200 rounded-full cursor-pointer">
            <VideoCameraIcon className="h-5 text-fb-secondary-icon" />
          </span>
          <span className="p-2 hover:bg-gray-200 rounded-full cursor-pointer">
            <SearchIcon className="h-5 text-fb-secondary-icon" />
          </span>
          <span className="p-2 hover:bg-gray-200 rounded-full cursor-pointer">
            <DotsVerticalIcon className="h-5 text-fb-secondary-icon" />
          </span>
        </div>
      </div>
      <div>
        {ActiveUsers.map((user) => (
          <div
            key={user.name}
            className="flex items-center gap-5 min-w-[16rem] hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer"
          >
            <div className="relative inline-block">
              <Image
                layout="fixed"
                objectFit="cover"
                width={30}
                height={30}
                src={user.avatar}
                alt={user.name}
                className="rounded-full"
              />
              <span className="absolute bottom-1 right-0 p-[5px] rounded-full bg-green-600" />
            </div>
            <p className="capitalize font-semibold">{user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contacts;
