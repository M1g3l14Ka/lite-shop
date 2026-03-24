'use client'

import { useCartStore } from "@/store/cartStore"
import Image from "next/image"
import { motion } from "framer-motion"
import { calculateDiscountPrice } from "@/utils/priceUtils"
import { Trash2 } from "lucide-react"
import { useState } from "react"


export default function Cart() {

    const cart = useCartStore((state) => state.cart)
    const removeFromCart = useCartStore((state) => state.removeFromCart)
        const totalPrice = cart.reduce((sum, item) => {
        return sum + (calculateDiscountPrice(item.price, item.discountPercentage) * item.quantity);
    }, 0);

    const [selectedItems, setSelectedItems] = useState<number []>([])
    const handleCartItem = (id: number) => {
        setSelectedItems(prev =>
        prev.includes(id)
            ? prev.filter(item => item !== id)
            : [...prev, id]
        )
    }

    const updateQuantity = useCartStore((state) => state.updateQuantity)

    const handleQuantityChange = (id: number, delta: number) => {
        const item = cart.find(item => item.id === id)
        if (item) {
            updateQuantity(id, item.quantity + delta)
        }
    }

    return (
        
    <motion.div
        initial={{opacity:0, y:20}}
        animate={{opacity:1, y:20}}
        transition={{duration:0.7}}
        className="w-full min-h-screen flex relative"
    >                
        <div className="w-200 shrink-0 p-4 text-xl  font-bold">
            <div className="grid grid-cols-1 gap-4 text-white">
                <div className="text-white flex flex-wrap gap-4 m-2 w-auto h-auto justify-center">
                    {
                        cart.map((item) => {
                            const finalPrice = calculateDiscountPrice(item.price, item.discountPercentage);
                            return (
                                <div 
                                    key={item.id}
                                    onChange={(e) => e.stopPropagation()}
                                    onClick={() => handleCartItem(item.id)}
                                    className={`flex w-full items-center h-auto mt-auto bg-[#101010] rounded-2xl cursor-pointer
                                        ${selectedItems.includes(item.id) ? "bg-linear-30 from-emerald-400 to-blue-500" : ""}`}
                                >
                                    <div className="flex justify-start items-center w-full ">
                                        <div className="flex justify-center items-center relative aspect-square p-2 m-2 ml-12 overflow-hidden rounded-xl bg-white/5">
                                            <Image
                                                width={125}
                                                height={125}
                                                src={item.thumbnail}
                                                alt={item.title}
                                                className="object-cover w-auto"
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center items-center w-full m-2 p-2">
                                            <h2 className="line-clamp-1">{item.title}</h2>
                                            <h2> price: ${finalPrice} <span className="text-gray-500 line-through text-base">${item.price}</span></h2>
                                            <div className="flex items-center gap-2 mt-2">
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        handleQuantityChange(item.id, -1)
                                                    }}
                                                    className="px-3 py-1 bg-white/10 rounded hover:bg-white/20"
                                                >
                                                    -
                                                </button>
                                                <span className="w-8 text-center">{item.quantity}</span>
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        handleQuantityChange(item.id, 1)
                                                    }}
                                                    className="px-3 py-1 bg-white/10 rounded hover:bg-white/20"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>

        <div className="flex-1 border border-green-500 bg-[#101010] p-4">
            <div className="text-white">
                Основной контент справа
            </div>
        </div>
    </motion.div>
    )
}
