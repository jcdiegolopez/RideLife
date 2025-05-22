import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import AppContext from "../context/AppContext"
import CartItemCard from "../components/Cart/CartItemCard"
import CartSummary from "../components/Cart/CartSummary"
import CheckoutModal from "../components/common/Modal"
import { FaLongArrowAltLeft, FaRegTrashAlt } from "react-icons/fa"


export default function CartPage() {
  const { cart, clearCart } = useContext(AppContext)
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  const handleCheckout = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <div className="min-h-screen bg-primary-dark text-white-custom font-poppins">
      <div className="container mx-auto px-4 py-8 max-w-4xl relative">
        <FaLongArrowAltLeft className="lg:absolute top-10 left-[-30px] text-white-custom w-6 h-6 p-0 mb-4 hover:text-accent-pink" onClick={() => navigate(-1)}/>
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        {cart.length > 0 ? (
          <>
            <button
              onClick={clearCart}
              className="flex items-center gap-2 bg-secondary-dark hover:bg-opacity-80 px-4 py-2 rounded-md mb-6 transition"
            >
              <FaRegTrashAlt />
              Clear All
            </button>

            <div className="space-y-6 mb-8">
              {cart.map((item) => (
                <CartItemCard key={item.id} item={item} />
              ))}
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-6">Subtotal ({cart.length} items)</h2>
              <CartSummary onCheckout={handleCheckout} />
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl mb-4">Your cart is empty</h2>
            <button
              onClick={() => navigate("/")}
              className="bg-accent-red hover:bg-opacity-90 px-6 py-3 rounded-md transition"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>

      {showModal && <CheckoutModal onClose={handleCloseModal} />}
    </div>
  )
}
