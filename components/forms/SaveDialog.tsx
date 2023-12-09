"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardSchema } from "../../lib/validations";
import { useRouter, usePathname } from "next/navigation";
import { createCard } from "@/lib/actions/card.action";
import { useFightersStore } from "@/store/fightCardStore";

interface Props {
  mongoUserId: string;
}

interface Fighter {
  title: string;
  score: string;
  imgSrc: string;
}

const SaveDialog = ({ mongoUserId }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const fightPairs = useFightersStore((state) => state.fightPairs);

  const form = useForm<z.infer<typeof CardSchema>>({
    resolver: zodResolver(CardSchema),
    defaultValues: {
      title: "Title is required",
    },
  });

  async function onSubmit(values: z.infer<typeof CardSchema>) {
    try {
      // Transformace údajů fightPairs na očekávaný formát
      const fightersToSave = fightPairs
        .flatMap((pair) => pair) // Převod dvojic na jednotlivé bojovníky
        .filter((fighter): fighter is Fighter => fighter !== null) // Odfiltrování null hodnot
        .map((fighter) => ({
          title: fighter.title,
          score: fighter.score,
          imgSrc: fighter.imgSrc,
        }));

      await createCard({
        title: values.title,
        fighters: fightersToSave,
        author: mongoUserId,
        path: pathname,
      });

      router.push("/home");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger className="no-focus btn">Save</DialogTrigger>
        <DialogContent className=" bg-white p-10">
          <DialogHeader>
            <DialogTitle>Enter the name of the FightCard</DialogTitle>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex w-full flex-col gap-10"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormControl className="mt-3.5">
                        <Input className="no-focus" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <div className="flex items-center justify-end gap-2">
                  <Button type="submit" className="no-focus btn">
                    Save
                  </Button>
                  <Button className="no-focus btn">Close</Button>
                </div>
              </form>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SaveDialog;