import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { Bebas_Neue, Raleway } from "next/font/google"
import "styles/globals.css"

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
})

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body className={`${raleway.variable} ${bebasNeue.variable} font-sans`}>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
