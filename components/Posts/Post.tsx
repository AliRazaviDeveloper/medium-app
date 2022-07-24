import Link from "next/link";
import { FunctionComponent } from "react";
import { urlFor } from "../../sanity";
import { Post } from "../../typings";

interface PostProps {
  post: Post;
}

const Post: FunctionComponent<PostProps> = ({ post }) => {
  return (
    <Link href={`/post/${post.slug.current}`}>
      <div className="group cursor-pointer border rounded-md overflow-hidden   ">
        <img
          className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out "
          src={urlFor(post.mainImage).url()!}
          alt={post.title}
        />
        <div className="flex justify-between p-5 bg-white">
          <div className="flex flex-col gap-3">
            <p className="font-bold text-slate-800 text-lg">{post.title}</p>
            <p className="font-normal text-slate-500 text-sm">
              {post.description}
            </p>
            <p className="font-normal text-slate-500 text-sm">
              نوشته شده توسط :{" "}
              <span className="text-blue-400 underline cursor-pointer">
                {post.author.name}
              </span>
            </p>
          </div>
          <img
            className="h-12 w-12 rounded-full mr-4"
            src={urlFor(post.author.image).url()!}
            alt={post.author.name}
          />
        </div>
      </div>
    </Link>
  );
};

export default Post;
