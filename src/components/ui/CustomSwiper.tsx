"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

interface SwiperSlide {
  id: string | number;
  content: React.ReactNode;
}

interface CustomSwiperProps {
  slides: SwiperSlide[];
  slidesPerView?: number;
  spaceBetween?: number;
  className?: string;
}

import React from "react";

export default function CustomSwiper({
  slides,
  slidesPerView = 3,
  spaceBetween = 24,
  className = "",
}: CustomSwiperProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [slideWidth, setSlideWidth] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(slidesPerView);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const w = window.innerWidth;
        const vSlides = w < 640 ? 1 : w < 1024 ? 2 : slidesPerView;
        setVisibleSlides(vSlides);
        const containerWidth = containerRef.current.offsetWidth;
        const sw =
          (containerWidth - spaceBetween * (vSlides - 1)) / vSlides;
        setSlideWidth(sw);
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [slidesPerView, spaceBetween]);

  const maxIndex = Math.max(0, slides.length - visibleSlides);

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(index, maxIndex));
    setActiveIndex(clamped);
    setCurrentTranslate(-(clamped * (slideWidth + spaceBetween)));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setOffsetX(e.clientX - startX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (Math.abs(offsetX) > slideWidth * 0.2) {
      goTo(offsetX < 0 ? activeIndex + 1 : activeIndex - 1);
    }
    setOffsetX(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setOffsetX(e.touches[0].clientX - startX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (Math.abs(offsetX) > 50) {
      goTo(offsetX < 0 ? activeIndex + 1 : activeIndex - 1);
    }
    setOffsetX(0);
  };

  const translateX = currentTranslate + (isDragging ? offsetX : 0);

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <div
        ref={containerRef}
        className="cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div
          className="flex"
          animate={{ x: translateX }}
          transition={
            isDragging
              ? { duration: 0 }
              : { type: "spring", stiffness: 300, damping: 35 }
          }
          style={{ gap: spaceBetween }}
        >
          {slides.map((slide, i) => (
            <motion.div
              key={slide.id}
              style={{ width: slideWidth, flexShrink: 0 }}
              animate={{
                scale: i === activeIndex ? 1 : 0.96,
                opacity: i >= activeIndex && i < activeIndex + visibleSlides ? 1 : 0.5,
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {slide.content}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Custom dots */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="relative h-px cursor-pointer transition-all duration-300"
            style={{ width: i === activeIndex ? 32 : 16 }}
            aria-label={`Go to slide ${i + 1}`}
          >
            <span
              className="absolute inset-0 transition-all duration-300"
              style={{
                background:
                  i === activeIndex ? "var(--accent)" : "rgba(255,255,255,0.2)",
              }}
            />
          </button>
        ))}
      </div>

      {/* Arrow controls */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-2 md:-px-6">
        <button
          onClick={() => goTo(activeIndex - 1)}
          disabled={activeIndex === 0}
          className="pointer-events-auto w-10 h-10 flex items-center justify-center border border-white/20 hover:border-white/60 hover:bg-white/5 transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed"
          aria-label="Previous slide"
        >
          <span className="text-white text-sm">←</span>
        </button>
        <button
          onClick={() => goTo(activeIndex + 1)}
          disabled={activeIndex >= maxIndex}
          className="pointer-events-auto w-10 h-10 flex items-center justify-center border border-white/20 hover:border-white/60 hover:bg-white/5 transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed"
          aria-label="Next slide"
        >
          <span className="text-white text-sm">→</span>
        </button>
      </div>
    </div>
  );
}
