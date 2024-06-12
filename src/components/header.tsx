import Link from "next/link";
import HeaderAuth from "@/components/header-auth";
import {Search} from "lucide-react";
import {Input} from "@/components/ui/input";

export default function Header() {
  return (
    <header className="sticky top-0 flex h-16 justify-between items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav
        className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        ><span className="font-bold">Discuss</span>
        </Link>
      </nav>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
        <Input
          type="search"
          placeholder="Search..."
          className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
        />
      </div>
      <div className="flex gap-4">
        <HeaderAuth />
      </div>
    </header>
  )
}
