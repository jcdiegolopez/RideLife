import { useContext } from "react"
import type { CartItem } from "../../utils/types"
import AppContext from "../../context/AppContext"


interface CartItemCardProps {
  item: CartItem
}

export default function CartItemCard({ item }: CartItemCardProps) {
  const { addToCart, reduceFromCart } = useContext(AppContext)

  return (
    <div className="flex items-start gap-4 bg-opacity-40 p-4 rounded-lg font-poppins">
      <div className="w-32 h-20 overflow-hidden rounded-md bg-white-custom">
        <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-normal">{item.name}</h3>
        {item.discount > 0 ? (
          <>
            <span className="text-accent-red  text-lg">
              ${item.price - (item.price * item.discount) / 100}
            </span>
            <span className="text-accent-pink line-through text-md ml-1">
              ${item.price}
            </span>
          </>
        ) : (
          <span className=" text-white-custom text-lg">
            ${item.price}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => reduceFromCart(item.id)}
          className="w-7 h-7 flex items-center justify-center bg-secondary-dark rounded-full hover:bg-opacity-80 transition"
          aria-label="Decrease quantity"
        >
          <span className="text-md font-bold">-</span>
        </button>

        <span className="text-md w-6 text-center ">{item.quantity}</span>

        <button
          onClick={() => addToCart(item)}
          className="w-7 h-7 flex items-center justify-center bg-secondary-dark rounded-full hover:bg-opacity-80 transition"
          aria-label="Increase quantity"
          disabled={item.quantity >= 9}
        >
          <span className="text-md font-bold">+</span>
        </button>
      </div>
    </div>
  )
}
