"use client";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ImageResponse } from "@/type";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { Download, Loader2 } from "lucide-react";
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

  const debouncedPrompt = useDebounce(prompt, 3000);

  const handleDownload = (b64Data: string, index: number) => {
    const link = document.createElement("a");
    link.href = `data:image/png;base64,${b64Data}`;
    link.download = `generated-image-${index}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
        <div className="flex-1 flex px-4 flex-col py-4 w-full h-full overflow-y-auto scrollbar-thin ">
          {isFetching && (
            <div className="flex flex-col items-center justify-center mb-4">
              <div className="flex gap-4">
                <p className="text-sm font-semibold text-muted-foreground">
                  Generating
                </p>
                <Loader2 className="h-4 w-4 ml-2 animate-spin" />
              </div>
            </div>
          )}
          {activeImage && (
            <div className="flex flex-col items-center">
              <div className="relative group">
                <Image
                  height={768}
                  width={1024}
                  src={`data:image/png;base64,${activeImage.b64_json}`}
                  alt=""
                  className={`${isFetching} ? "animate-pulse" : "max-w-full rounded-lg"`}
                />
                <Button
                  className="absolute top-2 right-2 hover:bg-white/10"
                  onClick={() => handleDownload(activeImage.b64_json, activeIndex!)}
                >
                  <Download className="h-5 w-5 text-black" />
                </Button>
              </div>
              <div className="mt-4 flex gap-4 pb-4 overflow-x-auto scrollbar-thin">
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
          )}{" "}
          {!activeImage && !isFetching && (
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
