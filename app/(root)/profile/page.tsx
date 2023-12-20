import { getUserInfo } from "@/lib/actions/user.action";
import { SignedIn, auth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import CardTab from "@/components/CardTab";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BiEdit, BiDotsVerticalRounded } from "react-icons/bi";
import Info from "@/components/Info";

interface URLProps {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}

const page = async ({ params, searchParams }: URLProps) => {
  const { userId: clerkId } = auth();

  // Ensure clerkId is not null. If it is, handle the case appropriately.
  if (!clerkId) {
    // Redirect to login or show an error message
    return <div>Please log in to view this page</div>;
  }

  // Use params.id if available, otherwise use clerkId
  const userIdToFetch = params.id || clerkId;

  const userInfo = await getUserInfo({ userId: userIdToFetch });

  if (!userInfo) {
    return <div>User not found</div>;
  }

  return (
    <div className="flex w-full flex-col items-center justify-center px-5 xl:px-80">
      <div className="flex-between w-full border-b border-neutral-400/20 py-5">
        <div className="flex-start gap-3">
          <Image
            src={userInfo.user.picture}
            alt="profile"
            width={36}
            height={36}
            className="h-8 w-8 rounded-full xs:h-12 xs:w-12"
          />
          <div className="">
            <span className="text-xs uppercase text-black/60">
              {userInfo.user.username}
            </span>
            <p className="text-sm font-medium xs:text-base">
              {userInfo.user.name}
            </p>
          </div>
          <div className="ml-5 hidden items-center justify-start gap-2 md:flex">
            <div className="flex-center flex-col">
              <span className="text-xs uppercase text-black/60">
                Cards created
              </span>
              <p>{userInfo.totalCards}</p>
            </div>
          </div>
        </div>
        <SignedIn>
          {clerkId === userInfo.user.clerkId && (
            <>
              <Link href={`/profile`}>
                <Button className="no-focus hidden bg-black text-lg text-white md:flex">
                  <BiEdit />
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="data-[state=open]:bg-muted flex h-8 w-8 p-0 md:hidden"
                  >
                    <BiDotsVerticalRounded className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px] bg-white">
                  <Link href="/profile">
                    <DropdownMenuItem className="cursor-pointer focus:bg-gray-300/20">
                      Edit
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </SignedIn>
      </div>
      <div className="flex-center mt-5 flex-col">
        <Info title="Cards created by user" />
        <div className="flex-center">
          <CardTab
            searchParams={searchParams}
            userId={userInfo.user._id}
            clerkId={clerkId}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
