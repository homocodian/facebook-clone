import {
  HomeIcon as HomeOutline,
  UsersIcon as UsersOutline,
  UserGroupIcon as GroupOutline,
} from "@heroicons/react/outline";
import {
  HomeIcon as HomeSolid,
  UsersIcon as UsersSolid,
  UserGroupIcon as GroupSolid,
} from "@heroicons/react/solid";
import { useState } from "react";
import HeaderIcon from "./HeaderIcon";

function Center() {
  const [isActive, setIsActive] = useState({
    home: true,
    friends: false,
    groups: false,
    gaming: false,
  });

  const handleActiveMenuChange = (title) => {
    switch (title) {
      case "home":
        setIsActive({
          home: true,
          friends: false,
          groups: false,
          gaming: false,
        });
        break;
      case "friends":
        setIsActive({
          home: false,
          friends: true,
          groups: false,
          gaming: false,
        });
        break;
      case "groups":
        setIsActive({
          home: false,
          friends: false,
          groups: true,
          gaming: false,
        });
        break;
      case "gaming":
        setIsActive({
          home: false,
          friends: false,
          groups: false,
          gaming: true,
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex items-center gap-2">
      <HeaderIcon
        title="home"
        Icon={isActive.home ? HomeSolid : HomeOutline}
        active={isActive.home}
        changeActive={handleActiveMenuChange}
      />
      <HeaderIcon
        title="friends"
        Icon={isActive.friends ? UsersSolid : UsersOutline}
        active={isActive.friends}
        changeActive={handleActiveMenuChange}
      />
      <HeaderIcon
        title="groups"
        Icon={isActive.groups ? GroupSolid : GroupOutline}
        active={isActive.groups}
        changeActive={handleActiveMenuChange}
      />
      <HeaderIcon
        title="gaming"
        Icon={isActive.gaming ? GamingIconSolid : GamingIconOutline}
        active={isActive.gaming}
        changeActive={handleActiveMenuChange}
      />
    </div>
  );
}

export default Center;

function GamingIconOutline() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.5 9.5H10.25a.75.75 0 00-.75.75v7c0 .414.336.75.75.75H17v5.5H4.5v-19h19v5zm0 14h-5v-6.25a.75.75 0 00-.75-.75H11V11h12.5v12.5zm1.5.25V4.25C25 3.561 24.439 3 23.75 3H4.25C3.561 3 3 3.561 3 4.25v19.5c0 .689.561 1.25 1.25 1.25h19.5c.689 0 1.25-.561 1.25-1.25z"
        fill="#4A5568"
      />
    </svg>
  );
}
function GamingIconSolid() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.25 18.5h6.25a.5.5 0 01.5.5v5.5a.5.5 0 01-.5.5H4.25C3.56 25 3 24.44 3 23.75V4.25C3 3.56 3.56 3 4.25 3h19.5c.69 0 1.25.56 1.25 1.25V9a.5.5 0 01-.5.5H10.25a.75.75 0 00-.75.75v7.5c0 .414.336.75.75.75zM11.5 17a.5.5 0 01-.5-.5v-5a.5.5 0 01.5-.5h13a.5.5 0 01.5.5v12.25c0 .69-.56 1.25-1.25 1.25H19a.5.5 0 01-.5-.5v-6.75a.75.75 0 00-.75-.75H11.5z"
        fill="#1b74e4"
      />
    </svg>
  );
}
