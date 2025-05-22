"use client"

import { useContext } from "react"
import AppContext from "../../context/AppContext"

interface CartSummaryProps {
  onCheckout: () => void
}

export default function CartSummary({ onCheckout }: CartSummaryProps) {
  const { getTotal } = useContext(AppContext)
  const total = getTotal()

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-lg">Subtotal</span>
        <span className="text-lg">${total.toFixed(2)}</span>
      </div>

      <div className="border-t border-secondary-dark pt-4">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xl font-bold">Total:</span>
          <span className="text-xl font-bold">${total.toFixed(2)}</span>
        </div>

        <button
          onClick={onCheckout}
          className="w-full bg-accent-red hover:bg-opacity-90 py-4 rounded-md text-lg font-semibold transition"
        >
          Checkout
        </button>
      </div>
    </div>
  )
}
