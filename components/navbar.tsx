"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, PawPrint, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/booking", label: "Booking" },
  { href: "/admin", label: "Admin" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8"
    >
      <div className="glass-panel mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-3">
        <Link href="/" className="flex items-center gap-3 text-sm font-semibold text-slate-800">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg shadow-slate-900/15">
            <PawPrint className="h-5 w-5" />
          </span>
          <span>
            PetWash
            <span className="block text-xs font-medium text-slate-500">Pet care with calm hands</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                  active
                    ? "bg-white text-slate-900 shadow-md"
                    : "text-slate-600 hover:bg-white/70 hover:text-slate-900",
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/booking"
            className="ml-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
          >
            Book Sekarang
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-700 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="glass-panel mx-auto mt-3 max-w-7xl rounded-[2rem] p-3 md:hidden"
        >
          <div className="flex flex-col gap-2">
            {links.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-2xl px-4 py-3 text-sm font-medium",
                    active ? "bg-white text-slate-900" : "text-slate-600",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </motion.div>
      ) : null}
    </motion.header>
  );
}
