import Image, { StaticImageData } from "next/image"

interface PageShellProps {
  topImage: string | StaticImageData
  bgTileImage: string | StaticImageData
  topImageAlt?: string
  children?: React.ReactNode
  className?: string
}

export default function PageShell({
  topImage,
  bgTileImage,
  topImageAlt = "",
  children,
  className = "",
}: PageShellProps) {
  return (
    <div
      className={`relative min-h-screen w-full ${className}`}
      style={{
        backgroundImage: `url(${
          typeof bgTileImage === "string" ? bgTileImage : bgTileImage.src
        })`,
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
      }}
    >
      {/* Top image — pinned to top, full width, intrinsic height */}
      <div className="absolute top-0 left-0 w-full">
        <Image
          src={topImage}
          alt={topImageAlt}
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      {/* Page content rendered on top of the tiled background */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
