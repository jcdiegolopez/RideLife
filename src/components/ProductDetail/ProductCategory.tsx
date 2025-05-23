import { BiCategory } from "react-icons/bi"


interface ProductCategoryProps {
  category: string;
}

function ProductCategory({ category }: ProductCategoryProps) {
  return (
    <div className="flex items-center gap-2">
    <div className="w-8 h-8 bg-secondary-dark rounded-lg flex items-center justify-center text-white-custom">
        <BiCategory />
    </div>
    <div>
        <p className="text-white-custom font-medium text-sm">Category</p>
        <p className="text-accent-pink text-sm capitalize">
        {category}
        </p>
    </div>
    </div>
  )
}

export default ProductCategory