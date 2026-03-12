"use client"

import Button from "components/ui/Button"
import StackedSlider from "../slider"
import SectionIntro from "components/SectionIntro"

export default function FeedStackSection() {
  return (
    <section className="w-full min-h-screen text-white flex items-center  py-24">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 gap-12 items-center lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <SectionIntro
          descriptionClassName="text-neutral-200"
          title={
            <>
              STRAIGHT <br /> FROM THE FEED.
            </>
          }
          description={
            <>
              The scene never sleeps.
              <br />
              Tap in to what's moving right now.
            </>
          }
          buttonText="Pull Up"
        />
        <div className="flex justify-center lg:justify-start">
          <StackedSlider />
        </div>

        {/* RIGHT CONTENT */}
      </div>
    </section>
  )
}
