import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <div>
      <nav>
        <Link href="/">
          <Image
            src="logo.svg"
            alt="Meteorological Report App"
            width={40}
            height={40}
          ></Image>
        </Link>
      </nav>
    </div>
  );
};

export default Header;
