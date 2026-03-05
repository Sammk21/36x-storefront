"use client"

import Image from "next/image"

const collaborations = [
  {
    title: "HOOD MONARCHY",
    subtitle: "CREW 404, Graffiti Collective",
    image:
      "https://images.unsplash.com/photo-1771777400683-8614965bfce5?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "HOOD MONARCHY",
    subtitle: "CREW 404, Graffiti Collective",
    image:
      "https://images.unsplash.com/photo-1772107756927-a3975482b1ef?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "HOOD MONARCHY",
    subtitle: "CREW 404, Graffiti Collective",
    image:
      "https://images.unsplash.com/photo-1771777400683-8614965bfce5?q=80&w=1200&auto=format&fit=crop",
  },
]

export default function ArtistCollaborations() {
  return (
    <section className="w-full bg-black text-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display leading-[0.95]">
            ARTIST COLLABORATIONS
          </h2>

          <p className="mt-4 text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto">
            Each collaboration tells a story through fabric, form, and color.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {collaborations.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-[36px] bg-neutral-900"
            >
              {/* Image */}
              <div className="relative h-[500px] w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Text Content */}
              <div className="absolute bottom-8 left-8">
                <h3 className="text-2xl font-display md:text-3xl font-semibold tracking-wide">
                  {item.title}
                </h3>
                <p className=" text-neutral-300 text-base md:text-lg">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
