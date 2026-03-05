"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  accentLine?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  accentLine = true,
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const alignClass = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  }[align];

  return (
    <div ref={ref} className={`flex flex-col gap-3 ${alignClass}`}>
      {accentLine && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="h-px w-16 origin-left"
          style={{ background: "var(--accent)" }}
        />
      )}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="text-5xl md:text-6xl lg:text-7xl leading-none tracking-tight uppercase"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          className="text-sm md:text-base text-gray-400 max-w-md leading-relaxed"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
