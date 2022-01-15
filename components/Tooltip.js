function Tooltip({ title, classNames }) {
  return (
    <span
      className={`hidden sm:group-hover:block absolute top-[115%] left-1/2 transform -translate-x-1/2 rounded-md bg-black 
      text-white text-center capitalize text-sm px-4 py-2 opacity-80 ${classNames} z-50`}
    >
      {title}
    </span>
  );
}

export default Tooltip;
