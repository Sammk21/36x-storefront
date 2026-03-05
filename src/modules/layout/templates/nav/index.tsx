import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import Image from "next/image"
import Button from "components/ui/Button"
import { ProgressiveBlur } from "@lib/components/ui/progressive-blur"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="fixed top-0  inset-x-0 z-50 group">
      <header className="relative h-20 mx-auto  duration-200 bg-transparent ">
        <nav className="content-container z-10 txt-xsmall-plus text-white flex items-center justify-between w-full h-full text-small-regular">
          <ProgressiveBlur className="z-0" position="top" height="100%" />
          <div className="h-7 z-1 relative w-52">
            <div className="flex-1 basis-0 h-full flex items-center">
              <LocalizedClientLink data-testid="nav-store-link" href="/">
                <Image
                  fill
                  className="object-contain"
                  src="/assets/logo/36x-logo.svg"
                  alt=""
                />
              </LocalizedClientLink>
            </div>
          </div>
          {/* <div className=" h-full flex items-center">
            <div className="h-full">
              <SideMenu regions={regions} />
            </div>
          </div> */}

          <div className="flex items-center z-1 text-white">
            <ul className="flex gap-4 uppercase font-display font-normal text-xl tracking-tight">
              <li>Culture</li>
              <li>Collection</li>
              <li>Community</li>
              <li>Core</li>
            </ul>
          </div>

          <div className="flex z-1 items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            {/* <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="hover:text-ui-fg-base"
                href="/account"
                data-testid="nav-account-link"
              >
                Account
              </LocalizedClientLink>
            </div> */}
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="uppercase flex font-display text-lg gap-2"
                  href="/cart"
                  data-testid="nav-cart-link "
                >
                  <img
                    className="h-4 w-4"
                    src="/assets/icons/Cart.svg"
                    alt=""
                  />
                  Cart (0)
                </LocalizedClientLink>
              }
            >
              {/* <Button className="rounded-lg text-lg uppercase"> */}
              <CartButton />
              {/* </Button> */}
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
