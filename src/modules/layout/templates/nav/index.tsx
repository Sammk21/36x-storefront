import { Suspense } from "react"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import Image from "next/image"
import { ProgressiveBlur } from "components/ui/progressive-blur"

const NAV_LINKS = ["Culture", "Collection", "Community", "Core"]

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <header className="relative mx-auto h-16 bg-transparent duration-200 md:h-20">
        <nav className="relative flex h-full w-full items-center justify-between px-5 text-white md:px-8">
          <ProgressiveBlur className="z-0" position="top" height="100%" />

          {/* Logo */}
          <div className="z-10 flex h-full items-center">
            <LocalizedClientLink data-testid="nav-store-link" href="/">
              <Image
                className="h-auto object-contain"
                src="/assets/logo/36x-logo.svg"
                alt=""
                width={70}
                height={10}
              />
            </LocalizedClientLink>
          </div>

          {/* Desktop nav links — hidden on mobile */}
          <div className="z-10 hidden items-center md:flex">
            <ul className="flex gap-8 font-display text-2xl uppercase tracking-tight">
              {NAV_LINKS.map((item) => (
                <li key={item}>
                  <a href="#" className="group flex flex-col items-center">
                    {item}
                    <span className="relative -mt-0.5 h-[2px] w-6 overflow-hidden">
                      <span className="absolute left-1/2 h-full w-0 bg-white transition-all duration-300 group-hover:left-0 group-hover:w-full" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right side */}
          <div className="z-10 flex items-center gap-x-4">
            {/* Cart — always visible */}
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="flex gap-2 font-display text-2xl uppercase"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  <img
                    className="h-4 w-4"
                    src="/assets/icons/Cart.svg"
                    alt=""
                  />
                  <span className="hidden sm:inline">Cart (0)</span>
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>

            {/* Mobile hamburger — only on mobile */}
            <div className="md:hidden">
              <SideMenu regions={regions} />
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
