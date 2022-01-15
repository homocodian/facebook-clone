import Tooltip from "../Tooltip";

function RightIcons({ Icon, title }) {
  return (
    <div className="relative group px-2 py-2 rounded-full bg-gray-200 cursor-pointer">
      <Icon />
      <Tooltip
        title={title}
        classNames={`top-[125%] ${title === "account" && "-translate-x-[75%]"}`}
      />
    </div>
  );
}

export default RightIcons;
