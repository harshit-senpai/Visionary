import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <main className="h-full dark:bg-background bg-background">
      <Navbar />
      <section className="mx-auto px-4 lg:px-8 py-5 max-w-2xl flex flex-col h-[90vh] justify-end">
        <div className="flex-1 flex px-4 flex-col py-4 overflow-y-auto w-full h-full">
          div
        </div>
        <Footer />
      </section>
    </main>
  );
}
