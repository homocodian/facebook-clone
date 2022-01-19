import { signOut } from "next-auth/react";
import Image from "next/image";
import { LogoutIcon } from "@heroicons/react/outline";
import SidebarRow from "./SidebarRow";
import {
  UsersIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  ClockIcon,
  ChevronDownIcon,
  FlagIcon,
  StarIcon,
} from "@heroicons/react/solid";

function Sidebar({ session }) {
  return (
    <div
      className="hidden xs:flex flex-col items-center 
      justify-start gap-1 xl:w-full  max-w-[280px] mt-6"
    >
      <div
        className="flex gap-4 sm:hover:bg-gray-200 
        w-full px-2 py-2 rounded-md cursor-pointer"
      >
        <Image
          priority
          layout="fixed"
          width={24}
          height={24}
          src={session.user.image}
          alt="user"
          className="rounded-full"
        />
        <p className="capitalize text-center font-semibold hidden md:block">
          {session.user.name}
        </p>
      </div>
      <SidebarRow Icon={UsersIcon} title={"find friends"} />
      <SidebarRow Icon={UserGroupIcon} title={"groups"} />
      <SidebarRow Icon={ShoppingBagIcon} title={"marketplace"} />
      <SidebarRow Icon={ClockIcon} title={"memories"} />
      <SidebarRow Icon={FlagIcon} title={"pages"} />
      <SidebarRow Icon={StarIcon} title={"favourites"} />
      <SidebarRow Icon={ChevronDownIcon} title={"see more"} />
      <div
        className=" w-full px-2 py-2 rounded-md flex 
        items-center gap-4 sm:hover:bg-gray-200 cursor-pointer"
        onClick={signOut}
      >
        <LogoutIcon className="h-6 text-fb-blue" />
        <p className="hidden md:block capitalize font-semibold">Logout</p>
      </div>
    </div>
  );
}

export default Sidebar;
