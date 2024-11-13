"use client";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ImageResponse } from "@/type";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [userAPIKey, setUserAPIKey] = useState("");
  const [activeIndex, setActiveIndex] = useState<number>();
  const [iterativeMode, setIterativeMode] = useState(false);
  const [generations, setGenerations] = useState<
    { prompt: string; image: ImageResponse }[]
  >([]);

  return (
    <main className="h-full dark:bg-background bg-background">
      <Navbar apiKey={userAPIKey} onAPIChange={setUserAPIKey} />
      <section className="mx-auto px-4 lg:px-8 py-5 max-w-2xl flex flex-col h-[90vh] justify-end">
        <div className="flex-1 flex px-4 flex-col py-4 overflow-y-auto w-full h-full">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Generate Images in realtime.</h2>
            <p className="mt-2 text-muted-foreground">
              Enter a prompt and generate images in milliseconds as you type
            </p>
          </div>
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
