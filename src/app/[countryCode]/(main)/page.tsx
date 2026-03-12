import { Metadata } from "next"
import { getRegion } from "@lib/data/regions"
import Button from "components/ui/Button"
import CollectionSection from "@modules/home/components/collection-section"
import { FragmentOfMovement } from "@modules/home/components/fragment-of-movement"
import FeedStackSection from "@modules/home/components/feed-section"
import ArtistCollaborations from "@modules/home/components/artist-collab"
import StackedSlider from "@modules/home/components/slider"
import PageShell from "components/PageShell"
import HomeHero from "@modules/home/components/HomeHero.tsx"

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
      <PageShell
        topImage={"/images/top.jpg"}
        bgTileImage={"/images/bottom.jpg"}
      >
        <HomeHero countryCode={countryCode} />
        <CollectionSection />
        <ArtistCollaborations />
        <FragmentOfMovement />
        <FeedStackSection />
      </PageShell>
    </>
  )
}
