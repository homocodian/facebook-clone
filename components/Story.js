import Image from "next/image";

function Story({ src, avatar, name }) {
  return (
    <div className="relative cursor-pointer rounded-xl w-12 h-12 sm:w-24 sm:h-36 sm:shadow-md lg:w-28 lg:h-48">
      <div className="hidden sm:block absolute rounded-full top-3 left-3 shadow-sm">
        <Image
          priority
          width={40}
          height={40}
          alt=""
          src={avatar}
          blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAALklEQVR42u3NMQ0AMAgAsOE/e0iQhxdkwNEaaPysfgtCLBaLxWKxWCwWi8V34wFLJE0dc1tGZwAAAABJRU5ErkJggg=="
          objectFit="cover"
          className="rounded-full z-10"
        />
      </div>
      <Image
        priority
        layout="fill"
        objectFit="cover"
        alt=""
        src={src}
        blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAALklEQVR42u3NMQ0AMAgAsOE/e0iQhxdkwNEaaPysfgtCLBaLxWKxWCwWi8V34wFLJE0dc1tGZwAAAABJRU5ErkJggg=="
        className="rounded-full sm:rounded-xl opacity-95 hover:opacity-70"
      />
      <p className="hidden sm:block absolute bottom-3 left-1 right-1 break-words text-white font-semibold text-center capitalize">
        {name}
      </p>
    </div>
  );
}

export default Story;
