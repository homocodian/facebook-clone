import Image from "next/image";
import FacebookLogo from "../../public/facebook.png";
import { SearchIcon } from "@heroicons/react/outline";

function Left() {
  return (
    <div className="flex items-center gap-2">
      <Image
        priority
        layout="fixed"
        width={40}
        height={40}
        alt="logo"
        src={FacebookLogo}
      />
      <div className="group">
        <div className="px-2 py-2 group rounded-full bg-gray-200 flex items-center gap-2 lg:w-40 xl:w-56">
          <label htmlFor="#search" className="group-focus-within:hidden">
            <SearchIcon className="h-5 text-fb-secondary-icon" />
          </label>
          <input
            type="search"
            placeholder="Search facebook"
            name="search"
            id="search"
            className="outline-none border-none w-full bg-transparent ml-2 hidden lg:block"
          />
        </div>
      </div>
    </div>
  );
}

export default Left;
