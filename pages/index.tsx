import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";

const Home: NextPage = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>medium blog</title>
        <meta name="description" content="Medium Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="flex max-w-7xl mx-auto justify-between items-center bg-yellow-400 border-y border-black py-10 md:py-0">
        <div className="px-10 space-y-7">
          <h1 className="text-6xl font-serif max-w-xl">Stay curious</h1>
          <h2>
            Discover stories, thinking, and expertise from writers on any topic.
          </h2>
          <button className="py-2 px-8 text-white bg-slate-700 rounded-full text-center">
            Start Reading
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
    </div>
  );
};

export default Home;
