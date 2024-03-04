import { configureStore } from "@reduxjs/toolkit";
import userReducer , {setUser,clearUser}  from "./user.slice"
import cartReducer , {setCart,clearCart, editCart, removeCart}  from "./cart.slice"


export const store = configureStore({
    reducer:{
        user: userReducer,
        cart: cartReducer
    }
})

export {setUser, clearUser, setCart, clearCart, editCart, removeCart} 