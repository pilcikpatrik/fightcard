"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import FightForm from "./forms/FightForm";
import { ScrollArea } from "./ui/scroll-area";
import CategoryForm from "./forms/CategoryForm";
import { BiArrowFromLeft, BiArrowFromRight, BiRevision } from "react-icons/bi";
import SaveDialog from "./forms/SaveDialog";
import { useFightersStore } from "@/store/fightCardStore";
import { useRouter } from "next/navigation";

// Předpokládáme, že máte definovaný typ pro Fight
interface Fight {
  title: string;
}

// Vytvoření 12 zápasů
const fights: Fight[] = Array.from({ length: 10 }, (_, i) => ({
  title: `Fight ${i + 1}`,
}));

interface CardFormProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  mongoUserId: string;
  card?: string;
  type?: string;
}

const CardForm = ({
  onToggleSidebar,
  isSidebarOpen,
  mongoUserId,
  card,
  type,
}: CardFormProps) => {
  const resetFightPairs = useFightersStore((state) => state.resetFightPairs);
  const router = useRouter();

  const handleClose = () => {
    resetFightPairs();
    router.push("/");
  };

  const handleReset = () => {
    resetFightPairs();
  };

  return (
    <div className="flex-start absolute left-0 top-0 z-40 flex w-full gap-2 p-2">
      <Button
        onClick={onToggleSidebar}
        className="no-focus hidden bg-black text-lg text-white xl:block"
      >
        {isSidebarOpen ? <BiArrowFromRight /> : <BiArrowFromLeft />}
      </Button>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="no-focus bg-black text-lg text-white xl:hidden">
            <BiArrowFromLeft />
          </Button>
        </SheetTrigger>
        <SheetContent
          side={"right"}
          className="h-full w-full border-none bg-white md:w-auto"
        >
          <SheetHeader>
            <SheetTitle>Build your Fight Card</SheetTitle>
            <SheetDescription>
              Create your dream Fight Card and share with others.
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[90%] w-full py-10">
            <div className="flex-col space-y-4">
              {fights.map((fight, index) => (
                <div key={fight.title} className="space-y-2">
                  <h3>{fight.title}</h3>
                  <CategoryForm pairIndex={index} />
                  <FightForm pairIndex={index} fighterIndex={0} />
                  <FightForm pairIndex={index} fighterIndex={1} />
                </div>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
      <SaveDialog mongoUserId={mongoUserId} card={card} type={type} />
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="btn no-focus">Close</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              progress on your FightCard.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="no-focus btn">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleClose} className="no-focus btn">
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Button
        onClick={handleReset}
        className="no-focus bg-black text-lg text-white"
      >
        <BiRevision />
      </Button>
    </div>
  );
};

export default CardForm;
