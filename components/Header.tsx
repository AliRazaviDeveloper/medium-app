import Link from "next/link";
import { FunctionComponent } from "react";

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
  return (
    <header className="flex justify-between p-5 max-w-7xl mx-auto">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <img
            src="https://miro.medium.com/max/8978/1*s986xIGqhfsN8U--09_AdA.png"
            alt="logo"
            className="w-44 object-contain cursor-pointer"
          />
        </Link>

        <div className="hidden md:inline-flex space-x-5 items-center">
          <h3>About</h3>
          <h3>Contact</h3>
          <h3 className="bg-green-600 text-white py-1 px-4 rounded-full cursor-pointer">
            Follow
          </h3>
        </div>
      </div>
      <div className="flex space-x-5 items-center">
        <h3 className="text-green-600">Sing in</h3>
        <h3 className="border px-4 py-1 rounded-full text-green-600 cursor-pointer ">
          Get Started
        </h3>
      </div>
    </header>
  );
};

export default Header;
