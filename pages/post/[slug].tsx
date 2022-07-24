import { GetStaticProps } from "next";
import Head from "next/head";
import { FunctionComponent } from "react";
import PortableText from "react-portable-text";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";

interface SinglePostProps {
  post: Post;
}

const SinglePost: FunctionComponent<SinglePostProps> = (
  props: SinglePostProps
) => {
  const { post } = props;

  return (
    <div>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <img
          src={urlFor(post.mainImage).url()}
          alt={post.title}
          className="w-full h-40 object-cover"
        />
        <article className="max-w-3xl mx-auto p-4">
          <h1 className="text-3xl text-slate-800 font-extrabold mt-10 mb-3">
            {post.title}
          </h1>

          <h2 className="text-md text-slate-500 font-light">
            {post.description}
          </h2>
          <div className="mt-5 flex items-center gap-4">
            <img
              src={urlFor(post.author.image).url()}
              alt={post.title}
              className="h-12 w-12 rounded-full"
            />
            <h3 className="text-slate-500 text-sm font-medium">
              نوشته شده توسط :{" "}
              <span className="font-bold text-blue-500">
                {post.author.name}
              </span>
            </h3>
            <h3 className="text-slate-500 text-sm font-medium">
              <span>
                در تاریخ : {new Date(post._createdAt).toLocaleString("fa-IR")}
              </span>
            </h3>
          </div>
          <div>
            <PortableText
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
              projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
              content={post.body}
              serializers={{
                h1: (props: any) => {
                  <h1 className="text-2xl font-bold my-5" {...props} />;
                },
                h2: (props: any) => {
                  <h2 className="text-xl font-bold my-5" {...props} />;
                },
                li: ({ children }: any) => {
                  <li className="ml-4 list-disc">{children}</li>;
                },
                link: ({ href, children }: any) => {
                  <a href={href} className="text-blue-500">
                    {children}
                  </a>;
                },
              }}
            />
          </div>
        </article>

        <hr className="border border-blue-500 max-w-lg mx-auto my-5" />

        <form className="max-w-lg mx-auto flex flex-col gap-5 p-4">
          <h2 className="text-xl text-blue-500 font-bold my-5">
            همین الان کامنت بذارید و نظر خود را اشتراک بگذارید .
          </h2>
          <label className="block mb-3 w-full">
            <span className="text-slate-500 inline-block mb-2">نام :</span>
            <input
              type="text"
              placeholder="نام خود را وارد کنید ..."
              className="border w-full   focus:ring-blue-500 focus:ring-1 focus:transition-all  form-input border-slate-300 outline-none text-sm  py-2 px-3 rounded-lg"
            />
          </label>
          <label className="block mb-3">
            <span className="text-slate-500 inline-block mb-2">ایمیل :</span>
            <input
              type="email"
              className="border w-full   focus:ring-blue-500 focus:ring-1 focus:transition-all  form-input border-slate-300 outline-none text-sm  py-2 px-3 rounded-lg"
              placeholder="ایمیل خود را وارد کنید ..."
            />
          </label>
          <label className="block mb-3">
            <span className="text-slate-500 inline-block mb-2">
              متن کامنت :
            </span>
            <textarea
              className="border w-full   focus:ring-blue-500 focus:ring-1 focus:transition-all  form-input border-slate-300 outline-none text-sm  py-2 px-3 rounded-lg"
              placeholder="متن کامنت را وارد کنید .."
              rows={8}
            />
          </label>
          <div className="flex w-full items-center">
            <button className="py-2 text-sm rounded-lg cursor-pointer px-5 bg-blue-500 text-white text-center w-full">
              ارسال نظر
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == 'post']{
    _id,
    slug{
        current
    }
  }`;

  const posts = await sanityClient.fetch(query);
  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == 'post' && slug.current == $slug][0]{
        _id,
        slug,
        _createdAt,
        title,
        author->{
        name,
        image
      },
      'comments':*[
        _type=='comment' && post._ref == ^._id &&
        approved == true
      ],
      description,
      mainImage,
      slug,
      body
      }`;

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};

export default SinglePost;
