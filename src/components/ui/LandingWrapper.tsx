"use client";

import React from "react";

interface LandingWrapperProps {
  children: React.ReactNode;
}

export default function LandingWrapper({ children }: LandingWrapperProps) {
  return (
    <div
      className="relative min-h-screen w-full"
      style={{
        backgroundImage: `
          radial-gradient(ellipse at 20% 50%, rgba(200,169,110,0.03) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.02) 0%, transparent 50%),
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='60'%3E%3Crect width='120' height='60' fill='%230a0a0a'/%3E%3Crect x='1' y='1' width='56' height='27' rx='1' fill='none' stroke='%23161616' stroke-width='0.8'/%3E%3Crect x='63' y='1' width='56' height='27' rx='1' fill='none' stroke='%23161616' stroke-width='0.8'/%3E%3Crect x='1' y='32' width='56' height='27' rx='1' fill='none' stroke='%23161616' stroke-width='0.8'/%3E%3Crect x='63' y='32' width='56' height='27' rx='1' fill='none' stroke='%23161616' stroke-width='0.8'/%3E%3C/svg%3E")
        `,
        backgroundRepeat: "no-repeat, no-repeat, repeat",
        backgroundSize: "cover, cover, 120px 60px",
        backgroundAttachment: "fixed",
        backgroundColor: "#080808",
      }}
    >
      {/* Top gradient bar */}
      <div
        className="fixed top-0 left-0 right-0 z-50 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #c8a96e, transparent)",
        }}
      />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 py-5">
        <div
          className="text-sm font-bold tracking-[0.3em] uppercase"
          style={{ fontFamily: "var(--font-heading)", color: "var(--white)" }}
        >
          35K
        </div>
        <div className="hidden md:flex items-center gap-8 text-xs tracking-widest uppercase text-gray-400">
          <a href="#" className="hover:text-white transition-colors">
            Collections
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Artists
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Community
          </a>
          <a href="#" className="hover:text-white transition-colors">
            About
          </a>
        </div>
        <button
          className="text-xs tracking-widest uppercase border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-all duration-300"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Cart (0)
        </button>
      </nav>

      {/* Content */}
      <main>{children}</main>
    </div>
  );
}
