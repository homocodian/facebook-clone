import Center from "./headerItems/Center";
import Left from "./headerItems/Left";
import Right from "./headerItems/Right";

function Header({ session }) {
  return (
    // navigation header
    <div
      className="flex items-center justify-between
     bg-white p-1 xs:p-2 lg:px-4 2xl:px-6 shadow-md"
    >
      <Left />
      <Center />
      <Right session={session} />
    </div>
  );
}

export default Header;
