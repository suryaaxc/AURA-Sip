import React from "react";
import { Instagram, Mail, Twitter } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer
      id="contact"
      className="relative z-10 scroll-mt-24 border-t border-aura-fog bg-aura-ink px-6 py-16 text-aura-cream md:px-14"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:justify-between">
        <div>
          <p className="text-luxe font-serif text-lg">AURA·SIP</p>
          <p className="mt-3 max-w-xs text-sm text-aura-cream/60">
            Organic botanicals & fermented tonic. A ritual, bottled — crafted
            in small, patient batches.
          </p>
          <a
            href="mailto:hello@aurasip.com"
            className="mt-4 inline-flex items-center gap-2 text-sm text-aura-cream/80 transition-colors hover:text-aura-gold"
          >
            <Mail size={15} />
            hello@aurasip.com
          </a>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          <div>
            <p className="text-luxe mb-3 text-[11px] text-aura-cream/40">
              Explore
            </p>
            <ul className="space-y-2 text-sm text-aura-cream/70">
              <li><a href="#home" className="hover:text-aura-gold">Home</a></li>
              <li><a href="#about" className="hover:text-aura-gold">About Us</a></li>
              <li><a href="#ingredients" className="hover:text-aura-gold">Ingredients</a></li>
            </ul>
          </div>
          <div>
            <p className="text-luxe mb-3 text-[11px] text-aura-cream/40">
              Ritual
            </p>
            <ul className="space-y-2 text-sm text-aura-cream/70">
              <li><a href="#reserve" className="hover:text-aura-gold">Reserve</a></li>
              <li><a href="#contact" className="hover:text-aura-gold">Contact</a></li>
            </ul>
          </div>
          <div>
            <p className="text-luxe mb-3 text-[11px] text-aura-cream/40">
              Follow
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="glass-pill flex h-9 w-9 items-center justify-center rounded-full text-aura-cream/80 hover:text-aura-gold"
                aria-label="Instagram"
              >
                <Instagram size={15} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="glass-pill flex h-9 w-9 items-center justify-center rounded-full text-aura-cream/80 hover:text-aura-gold"
                aria-label="Twitter"
              >
                <Twitter size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-white/10 pt-6 text-[11px] text-aura-cream/35">
        © {new Date().getFullYear()} AURA-SIP. All rights reserved.
      </div>
    </footer>
  );
}
