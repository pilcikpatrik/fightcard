import React from "react";
import Image from "next/image";

interface Props {
  title: string;
}

const Info = ({ title }: Props) => {
  return (
    <a
      className="mx-auto rounded-full bg-gradient-to-r from-[#edde5d] to-[#f09819] p-[1px] brightness-90 contrast-150 focus:outline-none dark:brightness-125 dark:contrast-100 sm:block"
      href="/"
    >
      <div className="group relative overflow-hidden rounded-full bg-white/80 px-3 py-1 duration-300 hover:pr-9 dark:bg-black/80">
        <span className="select-none bg-gradient-to-r from-[#edde5d] to-[#f09819] bg-clip-text text-transparent">
          <svg
            className="mr-1 inline-block h-4 w-4 fill-[#edde5d]"
            viewBox="4 4 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m19.2 36.4-4.75-10.45L4 21.2l10.45-4.75L19.2 6l4.75 10.45L34.4 21.2l-10.45 4.75ZM36.4 42l-2.35-5.25-5.25-2.35 5.25-2.4 2.35-5.2 2.4 5.2 5.2 2.4-5.2 2.35Z" />
          </svg>
          {title}
          <Image
            className="absolute -bottom-1 right-1 translate-y-7 duration-300 group-hover:translate-y-0"
            alt="doge smile"
            height="28"
            width="28"
            src="/assets/images/novotny.png"
          />
        </span>
      </div>
    </a>
  );
};

export default Info;
