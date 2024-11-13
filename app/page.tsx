"use client";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ImageResponse } from "@/type";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [userAPIKey, setUserAPIKey] = useState("");
  const [activeIndex, setActiveIndex] = useState<number>();
  const [iterativeMode, setIterativeMode] = useState(false);
  const [generations, setGenerations] = useState<
    { prompt: string; image: ImageResponse }[]
  >([]);

  const debouncedPrompt = useDebounce(prompt, 500);

  const { data: image, isFetching } = useQuery({
    queryKey: [debouncedPrompt],
    queryFn: async () => {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, userAPIKey, iterativeMode }),
      });

      if (!res.ok) throw new Error(await res.text());
      return res.json() as Promise<ImageResponse>;
    },
    enabled: !!debouncedPrompt.trim(),
    staleTime: Infinity,
    retry: false,
  });

  useEffect(() => {
    if (
      image &&
      !generations.map((genration) => genration.image).includes(image)
    ) {
      setGenerations((prev) => [...prev, { prompt, image }]);
      setActiveIndex(generations.length);
    }
  }, [generations, image, prompt]);

  const activeImage =
    activeIndex !== undefined ? generations[activeIndex]?.image : undefined;

  return (
    <main className="h-full dark:bg-background bg-background">
      <Navbar apiKey={userAPIKey} onAPIKeyChange={setUserAPIKey} />
      <section className="mx-auto px-4 lg:px-8 py-5 max-w-2xl flex flex-col md:h-[90vh] h-[85vh] justify-end">
        <div className="flex-1 flex px-4 flex-col py-4 overflow-y-auto w-full h-full">
          {activeImage ? (
            <div className="flex flex-col items-center">
              <Image
                height={768}
                width={1024}
                src={`data:image/png;base64,${activeImage.b64_json}`}
                alt=""
                className={`${isFetching} ? "animate-pulse" : "max-w-full rounded-lg"`}
              />
              <div className="mt-4 flex gap-4 overflow-x-auto pb-4">
                {generations.map((gen, i) => (
                  <button
                    key={i}
                    className="w-32 shrink-0 opacity-50 hover:opacity-100"
                    onClick={() => setActiveIndex(i)}
                  >
                    <Image
                      height={768}
                      width={1024}
                      src={`data:image/png;base64,${gen.image.b64_json}`}
                      alt=""
                      className="max-w-full rounded-lg"
                    />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="text-center">
                <h2 className="text-2xl font-bold">
                  Generate Images in realtime.
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Enter a prompt and generate images in milliseconds as you type
                </p>
              </div>
            </>
          )}
        </div>
        <Footer
          prompt={prompt}
          onPromptChange={setPrompt}
          iterativeMode={iterativeMode}
          onIterativeModeChange={setIterativeMode}
        />
      </section>
    </main>
  );
}
