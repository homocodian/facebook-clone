import Input from "./Input";
import Posts from "./Posts";
import Stories from "./Stories";

function Feeds({ posts, session }) {
  return (
    <div
      className="xs:px-1 sm:px-4 md:px-6 lg:px-8 flex-1 3xl:flex-none 3xl:mx-16  
      flex flex-col items-center justify-center"
    >
      <Stories session={session} />
      <Input session={session} />
      <Posts posts={posts} session={session} />
    </div>
  );
}

export default Feeds;
