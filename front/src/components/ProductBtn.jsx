import { useDispatch } from "react-redux"
import { setCart } from "../store"
import { toast } from "react-toastify"

export const ProductBtn = ({ product, qty = 1 }) => {
    const dispatch = useDispatch()

    const handleAddToCart = () => {
        const price = product.discounted_price > 0 ? product.discounted_price : product.price

        dispatch(setCart({
            id: product._id,
            price,
            qty,
            name: product.name,
            image: product.images[0],
        }))

        toast.success('Product added to cart')

    }


    return <button className="btn btn-outline-dark" type="button" onClick={handleAddToCart}>
        <i className="fas fa-cart-plus me-2"></i>Add to cart
    </button>
}