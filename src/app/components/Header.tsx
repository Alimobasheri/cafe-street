import Image from 'next/image';
import headerbg from '@/app/header-bg.webp';

const Header = () => {
  return (
    <header className="h-[20vh] w-full flex flex-col justify-start">
      <div className="relative w-full flex flex-col justify-center items-center ">
        <div className="w-full absolute top-0 left-0">
          <Image
            src={headerbg}
            alt="Sidewalk"
            width={0}
            height={0}
            className="w-full h-auto"
          />
        </div>
        {/* <div className="w-full gap-4 flex flex-col justify-center items-center p-8 z-10">
          <h1 className="text-6xl font-bold text-white">استریت</h1>
          <h2 className="text-lg font-bold text-primary">کافه و بازی</h2>
        </div> */}
      </div>
    </header>
  );
};

export default Header;
