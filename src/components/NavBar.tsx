"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useSite } from "./SiteContext";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About Us" },
  { href: "#ingredients", label: "Ingredients" },
  { href: "#reserve", label: "Reserve" },
  { href: "#contact", label: "Contact" },
];

export default function NavBar() {
  const { setReserveOpen, menuOpen, setMenuOpen } = useSite();

  return (
    <>
      <div className="pointer-events-auto fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-14 md:py-6">
        <a
          href="#home"
          className="font-serif text-luxe text-lg tracking-tight md:text-xl"
        >
          AURA·SIP
        </a>

        {/* Desktop menu */}
        <nav className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.slice(0, -1).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-luxe text-[11px] text-aura-ink/70 transition-colors hover:text-aura-ink"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => setReserveOpen(true)}
            className="glass-pill text-luxe rounded-full px-5 py-2 text-[11px] transition-transform hover:scale-105"
          >
            Reserve
          </button>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="glass-pill flex h-10 w-10 items-center justify-center rounded-full md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel pointer-events-auto fixed left-4 right-4 top-20 z-50 flex flex-col gap-1 rounded-2xl p-4 md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-luxe rounded-xl px-4 py-3 text-xs text-aura-ink/75 hover:bg-white/40"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMenuOpen(false);
                setReserveOpen(true);
              }}
              className="mt-1 rounded-xl bg-aura-ink px-4 py-3 text-center text-xs text-aura-cream"
            >
              Reserve Your Bottle
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
