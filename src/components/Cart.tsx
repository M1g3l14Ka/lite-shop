'use client'

import { useCartStore } from "@/store/cartStore"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { calculateDiscountPrice } from "@/utils/priceUtils"
import { Trash2 } from "lucide-react"


export default function Cart() {

    const cart = useCartStore((state) => state.cart)
    const removeFromCart = useCartStore((state) => state.removeFromCart)
    
    const totalPrice = cart.reduce((sum, item) => {
        const finalPrice = calculateDiscountPrice(item.price, item.discountPercentage);
        return sum + (finalPrice * item.quantity);
    }, 0);

    return (
        <motion.div
            initial={{opacity:0, y:20}}
            animate={{opacity:1, y:20}}
            transition={{duration:0.7}}
            className="flex flex-col justify-center items-center z-10 min-h-screen w-full"
        >
            <div className="w-full flex justify-center items-center m-2 border-b border-white border-dashed">
                <h1 className="text-2xl font-bold font-mono text-transparent bg-clip-text bg-linear-30 from-emerald-400 to-blue-500 hover:active:text-shadow-2xs">Корзина</h1>
                <Link href={"/"}>
                    <p className="ml-4 text-white text-xl">&times;</p>
                </Link>
            </div>

            <div className="flex flex-col items-center gap-3">
                {
                    cart.map((item) => {
                        const itemPrice = calculateDiscountPrice(item.price, item.discountPercentage);
                        return (
                            <div
                                key={item.id}
                                className="flex justify-center items-center flex-col gap-2 font-bold font-mono text-transparent bg-clip-text bg-linear-30 from-emerald-400 to-blue-500 border hover:border-emerald-500/80 rounded-2xl p-2 "
                            >
                                <div className="relative">
                                    <Image
                                        width={128}
                                        height={128}
                                        src={item.thumbnail}
                                        alt={item.title}
                                    />
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                <div className="text-center">
                                    <p>{item.title}</p>
                                    <div>
                                        <p>Price: ${itemPrice}</p>
                                        <p>Count: {item.quantity}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                <div className="text-2xl font-bold font-mono text-transparent bg-clip-text bg-linear-30 from-emerald-400 to-blue-500">
                    <p>Total price: ${totalPrice.toFixed(2)}</p>
                </div>
            </div>
        </motion.div>
    )
}
