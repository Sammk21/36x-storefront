"use client"
import Button from 'components/ui/Button'
import React from 'react'

const HomeHero = ({countryCode}: { countryCode: string }) => {
  return (
    <div className="min-h-screen  text-white flex items-center justify-center">
      <div className="text-center px-4 flex items-center justify-center flex-col ">
        <div>
          <h1 className=" text-6xl md:text-9xl tracking-normal leading-[104%] font-display ">
            BORN ON BRICK <br /> BUILT FOR MOTION
          </h1>
          <p className=" text-xl md:text-2xl ">
            Streetwear from the underground up.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            href={`/${countryCode}/collections`}
            className="mt-8 rounded-lg"
            variant="primary"
          >
            Community CTA
          </Button>
          <Button
            href={`/${countryCode}/collections`}
            className="mt-8 rounded-lg border-white"
            variant="outline"
          >
            Collections CTA
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HomeHero