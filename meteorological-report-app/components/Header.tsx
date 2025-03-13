import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <div className="bg-blue-300 shadow-xl p-4">
      <nav>
        <Link href="/" className="flex items-center w-fit">
          <Image
            src="logo.svg"
            alt="Meteorological Report App"
            width={64}
            height={64}
          ></Image>
          <h1 className="text-2xl font-sans text-white">Home</h1>
        </Link>
      </nav>
    </div>
  );
};

export default Header;
