"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Início", href: "/", icon: "home" },
    { label: "Catálogo", href: "/#produtos", icon: "devices" },
    { label: "Trade-in", href: "/trade-in", icon: "sync_saved_locally" },
    { label: "Checkout", href: "/checkout", icon: "shopping_bag" },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/90 backdrop-blur-lg border-t border-outline-variant/15 pb-safe"
      aria-label="Navegação inferior móvel"
    >
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`min-w-12 min-h-12 flex flex-col items-center justify-center gap-0.5 px-3 py-1 rounded-xl transition-all active:scale-95 select-none ${
                isActive
                  ? "text-primary font-semibold"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
                {item.icon}
              </span>
              <span className="font-label-sm text-[11px] leading-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
