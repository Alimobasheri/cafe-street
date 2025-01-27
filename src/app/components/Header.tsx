import Image from 'next/image';
import headerbg from '@/app/header-bg2.webp';

const Header = () => {
  return (
    <header className="max-w-md h-screen w-full flex flex-col justify-center items-center">
      <div className="relative w-full h-max-screen flex flex-col justify-center items-center ">
        <div className="w-full h-screen">
          <Image
            src={headerbg}
            alt="Sidewalk"
            width={0}
            height={0}
            className="h-screen object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
