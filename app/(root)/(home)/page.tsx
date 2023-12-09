import Home from "@/components/Home";
import Hero from "@/components/landing/Hero";
import { auth } from "@clerk/nextjs";

const page = () => {
  const { userId } = auth();

  return (
    <div className="flex w-full flex-col">{userId ? <Home /> : <Hero />}</div>
  );
};

export default page;
