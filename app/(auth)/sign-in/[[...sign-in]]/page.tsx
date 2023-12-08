import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="bg flex h-screen w-full items-center justify-center">
      <Image
        src="/assets/images/oktagonmma.png"
        alt="oktagonmma"
        width={1450}
        height={1450}
        className="absolute overflow-hidden p-5"
      />
      <SignIn />
    </div>
  );
}
