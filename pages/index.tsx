import Head from "next/head";
import Header from "../components/Header";
import Posts from "../components/Posts";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";
interface Props {
  posts: [Post];
}
const Home = (props: Props) => {
  const { posts } = props;

  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>بلاگ من</title>
        <meta name="description" content="بلاگ من" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="flex max-w-7xl mx-auto justify-between items-center bg-yellow-400 border-y border-black py-10 md:py-0">
        <div className="px-10 space-y-7">
          <h1 className="text-4xl font-serif max-w-xl">
            اینجا هستیم که در کنار هم رشد کنیم.
          </h1>
          <h2>داشتن موقعیت خلق یک سایت در حالت آماده است.</h2>
          <button className="py-2 px-8 text-white bg-slate-700 rounded-full text-center">
            همین الان شروع کنید
          </button>
        </div>
        <div>
          <img
            src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"
            alt=""
            className="hidden md:inline-flex h-32 lg:h-full"
          />
        </div>
      </div>

      <Posts posts={posts} />
    </div>
  );
};

export const getServerSideProps = async () => {
  const query = `*[_type == 'post']{
    _id,
    title,
    slug,
    mainImage,
    description,
    author->{name,image}
  
  }`;
  const posts = await sanityClient.fetch(query);
  return { props: { posts } };
};

export default Home;
