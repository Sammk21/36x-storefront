"use client"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../../../components/ui/hover-card"

import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import Button from "components/ui/Button"

const CartDropdown = ({ cart }: { cart?: HttpTypes.StoreCart | null }) => {
  const totalItems =
    cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0

  const subtotal = cart?.subtotal ?? 0

  return (
    <HoverCard openDelay={100} closeDelay={200}>
      <HoverCardTrigger >
        <Button variant="outline" className="font-display w-fit rounded-lg border-[1.5px] flex gap-2 uppercase font-semibold">

        <LocalizedClientLink
          href="/cart"
          className="font-display flex gap-2 uppercase font-semibold"
        >
          <img className="h-4 w-4" src="/assets/icons/Cart.svg" alt="" />
          {`Cart (${totalItems})`}
        </LocalizedClientLink>
        </Button>
      </HoverCardTrigger>

      <HoverCardContent align="end" className="w-[420px] p-0">
        <div className="p-4 flex items-center justify-center border-b">
          <h3 className="text-lg font-semibold">Cart</h3>
        </div>

        {cart && cart.items?.length ? (
          <>
            <div className="max-h-[400px] overflow-y-auto px-4 py-4 grid gap-y-8">
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[122px_1fr] gap-x-4"
                >
                  <LocalizedClientLink
                    href={`/products/${item.product_handle}`}
                    className="w-24"
                  >
                    <Thumbnail
                      thumbnail={item.thumbnail}
                      images={item.variant?.product?.images}
                      size="square"
                    />
                  </LocalizedClientLink>

                  <div className="flex flex-col justify-between">
                    <div className="flex justify-between">
                      <div className="flex flex-col w-[180px]">
                        <h3 className="text-sm truncate">
                          <LocalizedClientLink
                            href={`/products/${item.product_handle}`}
                          >
                            {item.title}
                          </LocalizedClientLink>
                        </h3>

                        <LineItemOptions variant={item.variant} />

                        <span>Quantity: {item.quantity}</span>
                      </div>

                      <LineItemPrice
                        item={item}
                        style="tight"
                        currencyCode={cart.currency_code}
                      />
                    </div>

                    <DeleteButton id={item.id} className="mt-1">
                      Remove
                    </DeleteButton>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 flex flex-col gap-y-4 border-t">
              <div className="flex justify-between">
                <span className="font-semibold">
                  Subtotal <span className="font-normal">(excl. taxes)</span>
                </span>

                <span className="text-lg font-semibold">
                  {convertToLocale({
                    amount: subtotal,
                    currency_code: cart.currency_code,
                  })}
                </span>
              </div>

              <LocalizedClientLink href="/cart">
                <Button className="w-full">Go to cart</Button>
              </LocalizedClientLink>
            </div>
          </>
        ) : (
          <div className="flex py-16 flex-col gap-y-4 items-center justify-center">
            <div className="bg-gray-900 w-6 h-6 flex items-center justify-center rounded-full text-white">
              0
            </div>

            <span>Your shopping bag is empty.</span>

            <LocalizedClientLink href="/store">
              <Button>Explore products</Button>
            </LocalizedClientLink>
          </div>
        )}
      </HoverCardContent>
    </HoverCard>
  )
}

export default CartDropdown
