import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-ful dark:bg-background/95 border-b dark:border-border border-border/40">
      <nav className="px-4 h-14 items-center flex">
        <div className="hidden md:flex">
          <Link className="flex items-center" href={"/"}>
            <span className="hidden lg:inline-block font-bold">Visionary</span>
          </Link>
        </div>
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
