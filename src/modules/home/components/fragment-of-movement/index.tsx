"use client"

import Image from "next/image"
import { BlurFade } from "@lib/components/ui/blur-fade"

const images = Array.from({ length: 9 }, (_, i) => {
  const isLandscape = i % 2 === 0
  const width = isLandscape ? 800 : 600
  const height = isLandscape ? 600 : 800
  return `https://picsum.photos/seed/${i + 1}/${width}/${height}`
})

export function FragmentOfMovement() {
  return (
    <section className="w-full bg-black text-white py-28 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl md:text-7xl font-display uppercase tracking-tight">
            FRAGMENTS OF THE MOVEMENT
          </h2>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto">
            The walls, the noise, the colors. Everything that makes 36x breathe.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((imageUrl, idx) => (
            <BlurFade key={imageUrl} delay={0.1 + idx * 0.05} inView>
              <div className="relative w-full overflow-hidden rounded-2xl">
                <Image
                  src={imageUrl}
                  alt={`Fragment ${idx + 1}`}
                  width={800}
                  height={1000}
                  className="w-full h-auto object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}
