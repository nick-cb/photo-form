"use client";

import { PhotoForm } from "@/components/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export default function Home() {
  const form = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: zodResolver(
      z.object({
        images: z.array(
          z.object({
            url: z.string(),
          }),
        ),
      }),
    ),
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <PhotoForm form={form} />
    </main>
  );
}
