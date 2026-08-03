"use client";

import React, { createContext, useContext, useState } from "react";

export const FLAVORS = [
  {
    id: "citrus",
    name: "Blood Orange & Ginger Root",
    note: "Bright, effervescent, warming",
  },
  {
    id: "mint",
    name: "Garden Mint & White Tea",
    note: "Cooling, herbaceous, clean",
  },
  {
    id: "adaptogen",
    name: "Reishi & Rose Botanicals",
    note: "Grounding, floral, calm",
  },
] as const;

export type FlavorId = (typeof FLAVORS)[number]["id"];

interface SiteContextValue {
  reserveOpen: boolean;
  setReserveOpen: (open: boolean) => void;
  flavor: FlavorId;
  setFlavor: (flavor: FlavorId) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [reserveOpen, setReserveOpen] = useState(false);
  const [flavor, setFlavor] = useState<FlavorId>(FLAVORS[0].id);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <SiteContext.Provider
      value={{
        reserveOpen,
        setReserveOpen,
        flavor,
        setFlavor,
        menuOpen,
        setMenuOpen,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) {
    throw new Error("useSite must be used within a SiteProvider");
  }
  return ctx;
}
