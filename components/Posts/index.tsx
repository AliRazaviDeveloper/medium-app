import { FunctionComponent } from "react";
import { Post as PostType } from "../../typings";
import Post from "./Post";

interface PostsProps {
  posts: [PostType];
}

const Posts: FunctionComponent<PostsProps> = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
      {posts.map((post) => {
        return <Post key={post._id} post={post} />;
      })}
    </div>
  );
};

export default Posts;
