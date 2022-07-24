import Link from "next/link";
import { FunctionComponent } from "react";

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
  return (
    <header className="flex justify-between p-5 max-w-7xl mx-auto">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <h1 className="ml-6 font-bold text-lg cursor-pointer text-blue-600">
            بلاگ من
          </h1>
        </Link>

        <div className="hidden md:inline-flex space-x-5 gap-8 items-center">
          <h3>درباره ما</h3>
          <h3>تماس با ما</h3>
          <h3 className="bg-green-600 text-white py-1 px-4 rounded-full cursor-pointer">
            دنبال کنید
          </h3>
        </div>
      </div>
      <div className="flex space-x-5 items-center gap-5">
        <h3 className="text-green-600">ورود به وب سایت</h3>
        <h3 className="border px-4 py-1 rounded-full text-green-600 cursor-pointer ">
          شروع کنید
        </h3>
      </div>
    </header>
  );
};

export default Header;
