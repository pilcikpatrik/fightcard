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
import { BiTrash, BiEdit, BiHomeAlt2 } from "react-icons/bi";
import { deleteCard } from "@/lib/actions/card.action";
import { useRouter, usePathname } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

interface Props {
  itemId: string;
}
const EditDelete = ({ itemId }: Props) => {
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

  return (
    <div className="flex-start absolute right-0 top-0 z-40 flex w-full gap-2 p-2">
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
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="no-focus btn">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="no-focus btn">
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
  );
};

export default EditDelete;
