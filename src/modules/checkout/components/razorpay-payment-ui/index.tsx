"use client"

import { useEffect, useState } from "react"
import { sdk } from "@lib/config"
import { placeOrder } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import ErrorMessage from "../error-message"

interface RazorpayPaymentUIProps {
  paymentSession: HttpTypes.StorePaymentSession
  cart: HttpTypes.StoreCart
  notReady?: boolean
  "data-testid"?: string
}

// Extend Window to include Razorpay
declare global {
  interface Window {
    Razorpay: any
  }
}

export function RazorpayPaymentUI({
  paymentSession,
  cart,
  notReady = false,
  "data-testid": dataTestId,
}: RazorpayPaymentUIProps) {
  const [loading, setLoading] = useState(false)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Load Razorpay checkout script
  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        // Check if already loaded
        if (window.Razorpay) {
          resolve(true)
          return
        }

        const script = document.createElement("script")
        script.src = "https://checkout.razorpay.com/v1/checkout.js"
        script.async = true
        script.onload = () => resolve(true)
        script.onerror = () => resolve(false)
        document.body.appendChild(script)
      })
    }

    loadRazorpayScript().then((loaded) => {
      setScriptLoaded(!!loaded)
    })
  }, [])

  const handlePayment = async () => {
    if (!scriptLoaded || !window.Razorpay) {
      setErrorMessage("Payment system is loading. Please try again.")
      return
    }

    setLoading(true)
    setErrorMessage(null)

    try {
      const paymentData = paymentSession.data as any

      // Debug: Log the payment session data to see what's being returned
      console.log("Payment session data:", paymentData)
      console.log("Full payment session:", paymentSession)

      // Debug: Check if key_id is present
      if (!paymentData.key_id) {
        console.error("Razorpay key_id is missing from payment session data")
        console.error("Available keys in paymentData:", Object.keys(paymentData || {}))
        setErrorMessage("Payment configuration error. Please contact support.")
        setLoading(false)
        return
      }

      const options = {
        key: paymentData.key_id,
        amount: paymentData.amount,
        currency: paymentData.currency,
        name: "Your Store", // TODO: Replace with your store name
        description: `Order for Cart ${cart.id}`,
        order_id: paymentData.id,
        handler: async function (response: {
          razorpay_payment_id: string
          razorpay_order_id: string
          razorpay_signature: string
        }) {
          try {
            // Step 1: Update the payment session with Razorpay response
            await sdk.client.fetch(
              `/store/payment-collections/${cart.payment_collection!.id}/payment-sessions/${paymentSession.id}`,
              {
                method: "POST",
                body: {
                  data: {
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                  },
                },
              }
            )

            // Step 2: Complete the cart to create the order
            await placeOrder()
          } catch (error: any) {
            console.error("Error completing payment:", error)
            setErrorMessage(
              error.message || "Payment verification failed. Please contact support."
            )
          } finally {
            setLoading(false)
          }
        },
        prefill: {
          name: cart.billing_address?.first_name
            ? `${cart.billing_address.first_name} ${cart.billing_address.last_name || ""}`
            : "",
          email: cart.email || "",
          contact: cart.billing_address?.phone || "",
        },
        notes: {
          cart_id: cart.id,
        },
        theme: {
          color: "#3399cc", // TODO: Customize with your brand color
        },
        modal: {
          ondismiss: function () {
            setLoading(false)
            console.log("Checkout form closed by user")
          },
        },
      }

      const razorpayInstance = new window.Razorpay(options)
      razorpayInstance.open()
    } catch (error: any) {
      console.error("Error opening Razorpay checkout:", error)
      setErrorMessage(
        error.message || "Failed to open payment checkout. Please try again."
      )
      setLoading(false)
    }
  }

  return (
    <>
      <Button
        onClick={handlePayment}
        disabled={loading || !scriptLoaded || notReady}
        size="large"
        isLoading={loading}
        data-testid={dataTestId}
      >
        {loading ? "Processing..." : scriptLoaded ? "Place order" : "Loading..."}
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="razorpay-payment-error-message"
      />
    </>
  )
}
