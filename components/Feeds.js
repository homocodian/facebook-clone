import Input from "./Input";
import Posts from "./Posts";
import Stories from "./Stories";

function Feeds({ posts, session }) {
  return (
    <div
      className="xs:px-1 sm:px-4 md:px-6 lg:px-8 flex-1 
      3xl:flex-none 3xl:mx-16 flex justify-center items-center"
    >
      <div className="h-screen overflow-y-scroll scrollbar-hide">
        <Stories session={session} />
        <Input session={session} />
        <Posts posts={posts} session={session} />
      </div>
    </div>
  );
}

export default Feeds;
