import Tooltip from "../Tooltip";

function HeaderIcon({ title, Icon, active = false, changeActive }) {
  return (
    <div
      className={`relative group ${
        !active ? "sm:hover:bg-fb-gray rounded-md" : "border-b-2 border-fb-blue"
      } px-2 sm:px-4 md:px-8 lg:px-10 xl:px-12  py-2 sm:py-3 cursor-pointer h-full`}
      onClick={() => changeActive(title)}
    >
      <Icon
        className={`h-6 cursor-pointer ${
          active ? "text-fb-blue" : "text-fb-secondary-icon"
        }`}
      />
      <Tooltip title={title} />
    </div>
  );
}

export default HeaderIcon;
