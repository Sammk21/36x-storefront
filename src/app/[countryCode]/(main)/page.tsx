import { Metadata } from "next"
import { getRegion } from "@lib/data/regions"
import Button from "components/ui/Button"
import CollectionSection from "@modules/home/components/collection-section"
import { FragmentOfMovement } from "@modules/home/components/fragment-of-movement"
import FeedStackSection from "@modules/home/components/feed-section"
import ArtistCollaborations from "@modules/home/components/artist-collab"
import StackedSlider from "@modules/home/components/slider"

export const metadata: Metadata = {
  title: "36X - Streetwear Store",
  description: "Premium streetwear and urban fashion by 36X.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  return (
    <>
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
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
      <CollectionSection />
      <ArtistCollaborations />
      <FragmentOfMovement />
      <FeedStackSection />
      <StackedSlider />
    </>
  )
}
