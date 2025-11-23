import { Metadata } from "next"
import { getRegion } from "@lib/data/regions"

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
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className=" text-6xl md:text-8xl font-display mb-6">36X</h1>
        <p className="/70 text-xl md:text-2xl mb-8">Streetwear Store</p>
        <p className="/50 text-lg max-w-2xl mx-auto"></p>
      </div>
    </div>
  )
}
