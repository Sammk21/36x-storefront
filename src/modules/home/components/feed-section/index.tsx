"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Button from "components/ui/Button"
import StackedSlider from "../slider"

const images = [
  "https://images.unsplash.com/photo-1772107756927-a3975482b1ef?q=80&w=987&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1771777400683-8614965bfce5?q=80&w=987&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1772107756927-a3975482b1ef?q=80&w=987&auto=format&fit=crop",
]

export default function FeedStackSection() {
  const [index, setIndex] = useState(0)

  const paginate = (direction: number) => {
    setIndex((prev) => {
      const next = prev + direction
      if (next < 0) return images.length - 1
      if (next >= images.length) return 0
      return next
    })
  }

  const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
    if (info.offset.x > 120) paginate(-1)
    if (info.offset.x < -120) paginate(1)
  }

  const getImageIndex = (offset: number) =>
    (index + offset + images.length) % images.length

  return (
    <section className="w-full min-h-screen bg-black text-white flex items-center px-6 py-24">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
        {/* STACK LEFT */}
        <StackedSlider/>

        {/* RIGHT CONTENT */}
        <div className="space-y-8">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display leading-[0.95]">
            STRAIGHT
            <br />
            FROM THE FEED.
          </h2>

          <p className="text-xl md:text-2xl text-neutral-400">
            The scene never sleeps.
            <br />
            Tap in to what's moving right now.
          </p>

          <Button variant="primary" className="rounded-xl px-8 py-4">
            Pull Up
          </Button>
        </div>
      </div>
    </section>
  )
}
