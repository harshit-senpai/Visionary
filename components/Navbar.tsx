import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-ful dark:bg-background/95 border-b dark:border-border border-border/40 supports-[backdrop-filter]:bg-background/60 ">
      <nav className="px-4 h-14 items-center flex">
        <div className="hidden md:flex lg:mr-6">
          <Link className="flex items-center" href={"/"}>
            <span className="hidden lg:inline-block font-bold">Visionary</span>
          </Link>
        </div>
        <Button
          asChild
          variant="link"
          className="md:flex md:items-center hidden"
        >
          <Link
            href={"/"}
            className="text-sm text-foreground/60 hover:text-foreground/80 cursor-pointer font-medium"
          >
            Get together API Key
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="-ml-2 mr-2 h-8 w-8 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="!size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 9h16.5m-16.5 6.75h16.5"
            />
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>

        <Input
          className="w-64 px-4 py-2 h-8 border border-input transition-colors focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:opacity-50 bg-muted/50 font-normal text-muted-foreground shadow-none text-sm placeholder:hover:text-accent-foreground hover:bg-accent md:mr-0 mr-2"
          placeholder="Enter your api key"
        />
        <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
          <div className="flex items-center gap-0.5">
            <Link
              href="https://github.com/harshit-senpai/Visionary"
              rel="noreferrer"
              target="_blank"
            >
              <GitHubLogoIcon className="h-9 w-9 rounded-md hover:bg-accent cursor-pointer p-2" />
            </Link>
            <ModeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
};
