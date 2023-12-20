"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  BiTrash,
  BiEdit,
  BiHomeAlt2,
  BiDotsVerticalRounded,
  BiShare,
} from "react-icons/bi";
import { deleteCard, setVisibleCard } from "@/lib/actions/card.action";
import { useRouter, usePathname } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  itemId: string;
  isVisible: boolean;
}
const EditDelete = ({ itemId, isVisible }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  const handleDelete = async () => {
    await deleteCard({
      cardId: JSON.parse(itemId),
      path: pathname,
    });
    router.push("/");
    toast({
      description: "Card has been deleted.",
    });
  };

  const handleShare = async () => {
    await setVisibleCard({
      cardId: JSON.parse(itemId),
      path: pathname,
    });
    toast({
      description: "Card has been published.",
    });
    router.push(`/card/${JSON.parse(itemId)}`);
  };

  return (
    <div className="absolute right-0 top-0">
      <div className="p-2">
        <div className="hidden items-center justify-start gap-2 sm:flex">
          <Link href={`/create-card/${JSON.parse(itemId)}`}>
            <Button className="no-focus bg-black text-lg text-white">
              <BiEdit />
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="no-focus bg-black text-lg text-white">
                <BiTrash />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="no-focus btn">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="no-focus btn"
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <AlertDialog>
            <AlertDialogTrigger
              asChild
              className={isVisible ? "hidden" : "flex"}
            >
              <Button className="btn no-focus hover_btn text-lg">
                <BiShare />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will publish your FightCard.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="no-focus btn hover_btn">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleShare}
                  className="no-focus btn hover_btn"
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Link href="/">
            <Button className="no-focus bg-black text-lg text-white">
              <BiHomeAlt2 />
            </Button>
          </Link>
        </div>
        <div className="sm:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="no-focus bg-black text-lg text-white">
                <BiDotsVerticalRounded />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px] bg-white p-0">
              <Link href={`/`}>
                <DropdownMenuItem className="cursor-pointer focus:bg-gray-300/20">
                  Home
                </DropdownMenuItem>
              </Link>
              <div className={`${!isVisible ? "flex" : "hidden"}`}>
                <DropdownMenuItem
                  onClick={handleShare}
                  className="cursor-pointer focus:bg-gray-300/20"
                >
                  Share
                </DropdownMenuItem>
              </div>

              <Link href={`/create-card/${JSON.parse(itemId)}`}>
                <DropdownMenuItem className="cursor-pointer focus:bg-gray-300/20">
                  Edit
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                className="cursor-pointer focus:bg-gray-300/20"
                onClick={handleDelete}
              >
                Delete
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default EditDelete;
