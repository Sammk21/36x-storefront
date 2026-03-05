"use client";

import { motion } from "motion/react";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
  onClick?: () => void;
  href?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Button({
  children,
  variant = "outline",
  onClick,
  href,
  className = "",
  size = "md",
}: ButtonProps) {
  const sizeStyles = {
    sm: "px-5 py-2 text-xs",
    md: "px-7 py-3 text-xs",
    lg: "px-10 py-4 text-sm",
  }[size];

  const variantStyles = {
    primary:
      "bg-white text-black hover:bg-[var(--accent)] hover:text-black border border-white",
    outline:
      "bg-transparent text-white border border-white/80 hover:border-white hover:bg-white/5",
    ghost:
      "bg-transparent text-white border-b border-white/30 hover:border-white rounded-none px-0",
  }[variant];

  const baseStyles = `inline-flex items-center gap-2 tracking-widest uppercase font-medium transition-all duration-300 cursor-pointer`;
  const combinedStyles = `${baseStyles} ${sizeStyles} ${variantStyles} ${className}`;

  const content = (
    <motion.span
      whileHover={{ x: variant === "ghost" ? 4 : 0 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-2"
      style={{ fontFamily: "var(--font-heading)" }}
    >
      {children}
      {variant === "ghost" && (
        <span className="text-[var(--accent)]">→</span>
      )}
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} className={combinedStyles}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={combinedStyles}>
      {content}
    </button>
  );
}
