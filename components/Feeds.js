import Input from "./Input";
import Posts from "./Posts";
import Stories from "./Stories";

function Feeds({ posts, session }) {
  return (
    <div className="container-height overflow-y-scroll scrollbar-hide">
      <div
        className="xs:px-2 sm:px-4 md:px-6 lg:px-8 flex-1 
        3xl:flex-none 3xl:mx-16 flex justify-center items-center mt-6"
      >
        <div>
          <Stories session={session} />
          <Input session={session} />
          <Posts posts={posts} session={session} />
        </div>
      </div>
    </div>
  );
}

export default Feeds;
