"use client"

import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Button from "components/ui/Button"

const images = [
  {
    src: "https://images.unsplash.com/photo-1771777400683-8614965bfce5?q=80&w=987&auto=format&fit=crop",
    alt: "Street fashion portrait 1",
  },
  {
    src: "https://images.unsplash.com/photo-1772107756927-a3975482b1ef?q=80&w=987&auto=format&fit=crop",
    alt: "Street fashion portrait 2",
  },
]

export default function CollectionSection() {
  const ref = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  // const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen bg-black text-white overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        {/* Slightly image-heavy layout */}
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-16 items-center">
          {/* LEFT CONTENT */}
          <div className="space-y-6">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-normal leading-[0.95]">
              WHERE STREET
              <br />
              MEETS CANVAS.
            </h2>

            <p className="text-xl md:text-2xl text-neutral-300 max-w-lg">
              A community redefining fashion as art.
            </p>

            <Button className="rounded-lg" variant="primary">
              Explore Collections
            </Button>
          </div>

          {/* RIGHT SLIDER */}
          <div className="relative overflow-hidden">
            <motion.div
              ref={sliderRef}
              drag="x"
              dragConstraints={sliderRef}
              className="flex gap-6 cursor-grab active:cursor-grabbing"
            >
              {images.map((img, index) => (
                <motion.div
                  key={index}
                  // style={{ y }}
                  className="relative min-w-[75%] md:min-w-[60%] aspect-9/13 rounded-[2rem] overflow-hidden flex-shrink-0"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
