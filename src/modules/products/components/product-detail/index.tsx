"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence, Variants } from "motion/react"
import { ShoppingCart, Zap, ChevronDown, ChevronUp } from "lucide-react"

// ─── Types ─────────────────────────────────────────────────────────────────────

type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL"

type AspectRatio = "tall" | "wide" | "square"

interface GalleryItem {
  id: number
  src: string
  alt: string
  aspect: AspectRatio
}

interface GalleryImageProps {
  src: string
  alt: string
  className?: string
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const SIZES: Size[] = ["XS", "S", "M", "L", "XL", "XXL"]

const IMAGES: GalleryItem[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1772242859562-124ab5ab2c3b?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Hood Monarchy back detail",
    aspect: "tall",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1772242859562-124ab5ab2c3b?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Hood Monarchy editorial shot 1",
    aspect: "wide",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1772242859562-124ab5ab2c3b?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Hood Monarchy editorial shot 2",
    aspect: "wide",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1772242859562-124ab5ab2c3b?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Hood Monarchy editorial shot 3",
    aspect: "square",
  },
]

// ─── Animation Variants ────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const imgVariant: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const slideUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

const staggerInfo: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.25 } },
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function GalleryImage({ src, alt, className = "" }: GalleryImageProps) {
  return (
    <motion.div
      variants={imgVariant}
      className={`relative overflow-hidden bg-zinc-900 ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover grayscale-15 hover:scale-105 transition-transform duration-700 ease-out"
      />
      {/* Subtle grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E\")",
        }}
      />
    </motion.div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function HoodMonarchyPDP() {
  const [selectedSize, setSelectedSize] = useState<Size | null>(null)
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false)

  return (
    <main
      className="min-h-screen bg-[#0a0a0a] text-white"
      style={{ fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif" }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;800;900&family=Barlow:wght@300;400;500&display=swap');
        * { box-sizing: border-box; }
        :root { --accent: #e8e0d0; }
      `}</style>

      <div className=" max-w-360 mx-auto flex flex-col lg:flex-row min-h-screen">
        {/* ── LEFT: Gallery (60%) ─────────────────────────────────────────────── */}
        <motion.section
          className="w-full lg:w-[60%] p-3 lg:p-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-2 gap-2 lg:gap-3">
            {/* Large vertical left image — spans 2 rows */}
            <GalleryImage
              src={IMAGES[0].src}
              alt={IMAGES[0].alt}
              className="col-span-1 row-span-2"
            />

            {/* Right column: two stacked editorial shots */}
            <div className="col-span-1 flex flex-col gap-2 lg:gap-3">
              <GalleryImage
                src={IMAGES[1].src}
                alt={IMAGES[1].alt}
                className="w-full aspect-4/3"
              />
              <GalleryImage
                src={IMAGES[2].src}
                alt={IMAGES[2].alt}
                className="w-full aspect-4/3"
              />
            </div>

            {/* Bottom full-width editorial strip */}
            <GalleryImage
              src={IMAGES[3].src}
              alt={IMAGES[3].alt}
              className="col-span-2 aspect-21/9"
            />
          </div>

          {/* Editorial label */}
          <motion.p
            variants={imgVariant}
            className="mt-3 text-xs tracking-[0.25em] text-zinc-500 uppercase"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            Hood Monarchy · FW Collection
          </motion.p>
        </motion.section>

        {/* ── RIGHT: Product Info (40%) ────────────────────────────────────────── */}
        <motion.section
          className="w-full lg:w-[40%] lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center px-6 py-10 lg:px-10 lg:py-0 border-l border-zinc-800/50"
          variants={staggerInfo}
          initial="hidden"
          animate="visible"
        >
          {/* Decorative rule */}
          {/* <motion.div variants={slideUp} className="h-px w-12 bg-white mb-8" /> */}

          {/* Brand tag */}
          <motion.span
            variants={slideUp}
            className="text-xs tracking-[0.3em] text-zinc-400 uppercase mb-4"
            style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}
          >
            36X Series
          </motion.span>

          {/* Title */}
          <motion.h1
            variants={slideUp}
            className="text-5xl lg:text-7xl font-black uppercase  font-display leading-none mb-6"
            style={{
              fontWeight: 900,
            }}
          >
            HOOD
            <br />
            MONARCHY
          </motion.h1>

          {/* Price */}
          <motion.div
            variants={slideUp}
            className="flex items-baseline gap-3 mb-8"
          >
            <span
              className="text-3xl font-bold"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
              }}
            >
              ₹ 1,999
            </span>
            <span
              className="text-sm text-zinc-500 line-through"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              ₹ 2,499
            </span>
            <span className="ml-1 text-xs bg-white text-black px-2 py-0.5 font-bold tracking-wider">
              SALE
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={slideUp}
            className="text-sm leading-relaxed text-zinc-400 mb-8 max-w-sm"
            style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}
          >
            36X is the anchor piece of the brand — the one that sits closest to
            our identity. Built from 280 GSM super-combed cotton, it holds its
            structure and falls naturally. The wide 1×1 rib keeps the neckline
            crisp through every wash.
          </motion.p>

          {/* More Details Toggle */}
          <motion.div variants={slideUp} className="mb-8">
            <button
              onClick={() => setDetailsOpen((prev) => !prev)}
              className="flex items-center gap-1 text-xs tracking-[0.2em] uppercase text-zinc-300 hover:text-white transition-colors"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              {detailsOpen ? (
                <ChevronUp size={12} />
              ) : (
                <ChevronDown size={12} />
              )}
              + More Details
            </button>

            <AnimatePresence>
              {detailsOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <ul
                    className="mt-4 space-y-2 text-xs text-zinc-500 border-l border-zinc-700 pl-4"
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  >
                    <li>280 GSM Super-combed Cotton</li>
                    <li>Oversized drop-shoulder silhouette</li>
                    <li>1×1 Ribbed neckline &amp; cuffs</li>
                    <li>Screen-printed archival graphic</li>
                    <li>Machine washable · Cold water</li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Size Selector */}
          <motion.div variants={slideUp} className="mb-10">
            <p
              className="text-xs tracking-[0.25em] uppercase text-zinc-500 mb-3"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              Select Size
            </p>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((size) => (
                <motion.button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className={[
                    "px-4 py-2 text-sm font-bold tracking-wider border transition-all duration-200",
                    selectedSize === size
                      ? "bg-white text-black border-white"
                      : "bg-transparent text-zinc-300 border-zinc-700 hover:border-zinc-400 hover:text-white",
                  ].join(" ")}
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    minWidth: "52px",
                  }}
                >
                  {size}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={slideUp} className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.03, backgroundColor: "#e8e0d0" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="flex-1 flex items-center justify-center gap-2 bg-white text-black py-4 text-sm font-black tracking-[0.15em] uppercase"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              <Zap size={15} strokeWidth={2.5} />
              Buy Now
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.03,
                backgroundColor: "rgba(255,255,255,0.06)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="flex-1 flex items-center justify-center gap-2 bg-transparent border border-zinc-600 text-white py-4 text-sm font-black tracking-[0.15em] uppercase hover:border-white transition-colors"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              <ShoppingCart size={15} strokeWidth={2} />
              Add to Cart
            </motion.button>
          </motion.div>

          {/* Footer note */}
          <motion.p
            variants={slideUp}
            className="mt-6 text-xs text-zinc-600 tracking-wider"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            Free shipping on orders above ₹3,000 · Easy returns
          </motion.p>
        </motion.section>
      </div>
    </main>
  )
}
