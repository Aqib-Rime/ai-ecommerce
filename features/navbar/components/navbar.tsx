import Link from "next/link";
import { UserMenu } from "./user-menu";

export function Navbar() {
  return (
    <header className="border-border/50 bg-background/95 supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-14 items-center justify-between mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-semibold">AI ecommerce</span>
        </Link>

        <nav className="flex items-center gap-2">
          <UserMenu />
        </nav>
      </div>
    </header>
  );
}
