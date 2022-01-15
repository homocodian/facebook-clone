function SidebarRow({ Icon, title }) {
  return (
    <div className=" w-full px-2 py-2 rounded-md flex items-center gap-4 sm:hover:bg-gray-200 cursor-pointer">
      <Icon className="h-6 text-fb-blue" />
      <p className="hidden md:block capitalize font-semibold">{title}</p>
    </div>
  );
}

export default SidebarRow;
