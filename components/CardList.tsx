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
  BiDotsVerticalRounded,
  BiShare,
} from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { getTimestamp } from "@/lib/utils";
import { deleteCard, setVisibleCard } from "@/lib/actions/card.action";
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  _id: string;
  title: string;
  createdAt: string;
}

const CardList = ({ _id, title, createdAt }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  const handleDelete = async () => {
    await deleteCard({
      cardId: JSON.parse(_id),
      path: pathname,
    });
    toast({
      description: "Card has been deleted.",
    });
  };

  const handleShare = async () => {
    await setVisibleCard({
      cardId: JSON.parse(_id),
      path: pathname,
    });
    toast({
      description: "Card has been published.",
    });
    router.push(`/card/${JSON.parse(_id)}`);
  };

  const urlId = JSON.parse(_id);

  const dateTime = new Date(createdAt);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex-start flex-col">
          <h3 className="font-bold">
            {" "}
            {title.length > 10 ? `${title.substring(0, 10)}...` : title}
          </h3>
          <p className="text-sm">{getTimestamp(dateTime)}</p>
        </div>
        <div className="flex items-center justify-end gap-2">
          <div className="sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="data-[state=open]:bg-muted flex h-8 w-8 p-0"
                >
                  <BiDotsVerticalRounded className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px] bg-white">
                <Link href={`/card/${urlId}`}>
                  <DropdownMenuItem>View</DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={handleShare}>Share</DropdownMenuItem>
                <Link href={`/create-card/${urlId}`}>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={handleDelete}>
                  Delete
                  <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <Link href={`/card/${urlId}`}>
              <Button className="no-focus bg-black text-lg text-white">
                <FaRegEye />
              </Button>
            </Link>
            <Link href={`/create-card/${urlId}`}>
              <Button className="no-focus bg-black text-lg text-white">
                <BiEdit />
              </Button>
            </Link>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="btn no-focus text-lg">
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
                  <AlertDialogCancel className="no-focus btn">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleShare}
                    className="no-focus btn"
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="btn no-focus text-lg">
                  <BiTrash />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your FightCard.
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
          </div>
        </div>
      </div>
      <Separator className="h-[1px] bg-slate-100" />
    </div>
  );
};

export default CardList;
