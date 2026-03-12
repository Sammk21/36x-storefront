"use client"

import React, { useCallback, useEffect, useRef } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"

// ─── Types ────────────────────────────────────────────────────────────────────

interface CollectionItem {
  id: string
  title: string
  tag: string
  image: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const COLLECTIONS: CollectionItem[] = [
  {
    id: "1",
    title: "Off-White™ × Bulls",
    tag: "New Drop",
    image:
      "https://images.unsplash.com/photo-1556906781-9a412961a28c?w=600&q=80",
  },
  {
    id: "2",
    title: "Varsity Heritage",
    tag: "Limited",
    image:
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=600&q=80",
  },
  {
    id: "3",
    title: "Canvas Series 03",
    tag: "Exclusive",
    image:
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&q=80",
  },
  {
    id: "4",
    title: "Street Archive",
    tag: "Archive",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
  },
]

// ─── Slide Card ───────────────────────────────────────────────────────────────

const SlideCard: React.FC<{ item: CollectionItem }> = ({ item }) => (
  // flex-[0_0_auto] + w set on the container — Embla controls sizing via the viewport
  <div
    className="relative w-full overflow-hidden rounded-[2rem]"
    style={{ aspectRatio: "4/5" }}
  >
    <img
      src={item.image}
      alt={item.title}
      className="absolute inset-0 h-full w-full object-cover"
      draggable={false}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
    <div className="absolute bottom-0 left-0 flex flex-col gap-1 p-5">
      <span className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-white/60">
        {item.tag}
      </span>
      <p className="text-sm font-semibold leading-tight text-white">
        {item.title}
      </p>
    </div>
  </div>
)

// ─── Arrow Icon ───────────────────────────────────────────────────────────────

const ArrowIcon: React.FC<{ dir?: "left" | "right" }> = ({ dir = "right" }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    className={dir === "left" ? "rotate-180" : ""}
  >
    <path
      d="M1 7h12M8 2l5 5-5 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// ─── Hero Collection ──────────────────────────────────────────────────────────

const HeroCollection: React.FC = () => {
  const autoplay = useRef(Autoplay({ delay: 3200, stopOnInteraction: false }))

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      dragFree: false,
      align: "start",
      // 1.5 slides visible: each slide is ~65% of the viewport width on desktop
      // controlled via CSS below
    },
    [autoplay.current]
  )

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <section
      className="relative flex h-100dvh w-full flex-col justify-between overflow-hidden  md:flex-row"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {/* ── Left: Text ── */}
      <div className="flex w-full flex-shrink-0 flex-col justify-center gap-5 px-8 pb-4 pt-12 md:w-[50%] lg:gap-7 lg:px-14 lg:py-0">
      

        {/* Headline */}
        <h1
          className="text-[clamp(3rem,8vw,6rem)] font-bold text-center uppercase leading-[0.92] text-white"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Where Street
          <br />
          <span
          
          >
          
            Meets Canvas.
          </span>
        </h1>

        {/* Sub */}
        <p className="w-full text-sm font-light text-center leading-relaxed text-white/50">
          A community redefining fashion as art.
        </p>

        {/* CTA + Nav row */}
        <div className="flex flex-wrap items-center gap-4 pt-1">
          <button className="group  hidden md:flex items-center gap-2.5 rounded-full bg-white px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-widest text-black transition-all hover:-translate-y-0.5 hover:bg-white/85">
            Explore Collections
            <span className="transition-transform group-hover:translate-x-1">
              <ArrowIcon />
            </span>
          </button>

          
        </div>
      </div>

      {/* ── Right: Slider ── */}
      {/*
        mask-image fades the trailing edge — works with Embla's pointer events
        unlike a DOM overlay which would block drag.
      */}
      <div
        className="flex min-h-0 flex-1 items-center"
        style={{
          maskImage: "linear-gradient(to right, black 78%)",
          WebkitMaskImage:
            "linear-gradient(to right, black 78%)",
        }}
      >
        {/* Embla viewport */}
        <div ref={emblaRef} className="w-full overflow-hidden">
          {/* Embla container — flex row, no wrap */}
          <div className="flex">
            {COLLECTIONS.map((item) => (
              <div
                key={item.id}
                className="
                  mr-3.5 min-w-0 flex-[0_0_83%]
                  lg:mr-5 lg:flex-[0_0_62%]
                "
              >
                <SlideCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bebas Neue — move to <head> / next/font in production */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');`}</style>
    </section>
  )
}

export default HeroCollection
