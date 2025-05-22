import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AppContext from "../../context/AppContext"

interface CheckoutModalProps {
  onClose: () => void
}

export default function CheckoutModal({ onClose }: CheckoutModalProps) {
  const { getTotal, clearCart } = useContext(AppContext)
  const navigate = useNavigate()
  const total = getTotal()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {

    document.body.style.overflow = "hidden"

    if (total > 999) {
      setError("Your purchase cannot exceed $999. Please adjust your cart.")
    } else {
      setError(null)
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [total])

  const handleCompleteCheckout = () => {
    if (error) return

    clearCart()
    navigate("/")
  }

  return (
    <div className="fixed inset-0 bg-primary-dark bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-secondary-dark rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Complete Your Order</h2>

        <div className="mb-6">
          <p className="mb-2">Total amount:</p>
          <p className="text-2xl font-bold text-accent-pink">${total.toFixed(2)}</p>

          {error && (
            <div className="mt-4 p-3 bg-accent-red bg-opacity-20 border border-accent-red rounded-md text-white-custom">
              {error}
            </div>
          )}
        </div>

        <div className="space-y-4">
          {!error && (<button
            onClick={handleCompleteCheckout}
            className={`w-full py-3 rounded-md font-semibold transition bg-accent-red hover:bg-opacity-90`}
            disabled={!!error}
          >
            Complete Purchase
          </button>)}

          <button
            onClick={onClose}
            className="w-full bg-secondary-dark border border-white-custom hover:bg-opacity-80 py-3 rounded-md font-semibold transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
