'use client'

import { useCartStore,  } from "@/store/cartStore"
import Image from "next/image"
import { motion } from "framer-motion"
import { calculateDiscountPrice } from "@/utils/priceUtils"
import { Trash2 } from "lucide-react"
import { useState } from "react"


export default function Cart() {

    const cart = useCartStore((state) => state.cart)
    const removeFromCart = useCartStore((state) => state.removeFromCart)

    const [selectedItems, setSelectedItems] = useState<number[]>([])
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

    const clearCart = useCartStore((state) => state.clearCart)

    const removeItemsInOrder = useCartStore((state) => state.removeItemInOrder)

    const handleClearItemsInOrder = () => {
        removeItemsInOrder(selectedItems)
        setSelectedItems([])
        alert("You made an order!")
    }

    const handleClearCart = () => {
        clearCart();
        alert('You cleaned your cart!')
    }

    const totalPrice = cart.filter(item => selectedItems.includes(item.id)).reduce((sum, item) => {return sum + (calculateDiscountPrice(item.price, item.discountPercentage) * item.quantity)}, 0)

    return (

    <motion.div
        initial={{opacity:0, y:20}}
        animate={{opacity:1, y:20}}
        transition={{duration:0.7}}
        className="w-full min-h-screen flex relative"
    >
        <div className="w-200 shrink-0 p-2 text-xl font-bold bg-[#101010] m-2 rounded-2xl">
            <div className="grid grid-cols-1 gap-4 text-white">
                <div className="text-white flex flex-wrap gap-4 m-2 w-auto h-auto justify-center">
                    <h1 className="text-2xl font-bold font-mono">Your cart</h1>
                    {
                        cart.map((item) => {
                            const finalPrice = calculateDiscountPrice(item.price, item.discountPercentage);
                            return (
                                <div
                                    key={item.id}
                                    onChange={(e) => e.stopPropagation()}
                                    onClick={() => handleCartItem(item.id)}
                                    className={`flex w-full justify-between items-center h-auto mt-auto bg-[#202020] rounded-2xl cursor-pointer
                                        ${selectedItems.includes(item.id) ? "bg-[#505050]" : ""}`}
                                >
                                    <div className="flex justify-start items-center w-full">
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
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={item.quantity}
                                                    onChange={(e) => {
                                                        e.stopPropagation()
                                                        const value = parseInt(e.target.value) || 1
                                                        updateQuantity(item.id, Math.max(1, value))
                                                    }}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="w-12 text-center bg-white/10 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-emerald-500 
                                                    [&::-webkit-inner-spin-button]:appearance-none 
                                                    [&::-webkit-outer-spin-button]:appearance-none 
                                                    [&::-webkit-inner-spin-button]:m-0 
                                                    [&::-webkit-outer-spin-button]:m-0 
                                                    [appearance:textfield] 
                                                    [&::-webkit-inner-spin-button]:h-0 
                                                    [&::-webkit-outer-spin-button]:h-0"
                                                />
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

                                        <div className="p-2 m-4">
                                            <button 
                                                className="w-auto h-auto text-red-500 cursor-pointer"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeFromCart(item.id);
                                                    setSelectedItems(prev => prev.filter(id => id !== item.id));
                                                }}
                                            >
                                                <Trash2/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="flex justify-center items-center w-full">
                <div>
                    { 
                        cart.length > 0 ? (
                            <div>
                                <button className="text-white text-2xl font-mono font-bold md:w-85 h-12 m-2 bg-linear-30 from-emerald-400 to-blue-500 rounded-2xl cursor-pointer hover:scale-105"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleClearCart();
                                    }}>Remove all from cart</button>
                            </div>
                        ) : (
                            <div className="flex justify-center items-center w-full text-2xl text-gray-500">
                                <h1>«tumbleweeds passing by»</h1>
                            </div>
                        ) 
                    }
                </div>
                </div>
            </div>
        </div>

        <div className="flex-1 bg-[#101010] p-3 m-2 gap-4 shrink-0 rounded-2xl">
            <h1 className="text-2xl text-white p-1 text-center font-mono font-bold">Your order</h1>
            <div className="flex flex-col justify-center items-center p-2 m-2">
                <div className="w-full mt-4 flex flex-col gap-4">
                    {selectedItems.length > 0 ? (
                        <>
                            <div className="flex flex-col gap-3">
                                {cart
                                    .filter(item => selectedItems.includes(item.id))
                                    .map((item) => {
                                        const itemPrice = calculateDiscountPrice(item.price, item.discountPercentage);
                                        return (
                                            <div key={item.id} className="flex justify-between items-center text-gray-300 border-b border-white/10 pb-2">
                                                <span className="line-clamp-1 flex-1 pr-4">{item.title}<span> x{item.quantity}</span></span>
                                                <span className="font-mono text-emerald-400">
                                                    ${(itemPrice * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            
                            <div className="mt-6 flex justify-between items-center text-xl font-bold border-t border-white/20 pt-4">
                                <span className="text-white">Total:</span>
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-blue-500">
                                    ${totalPrice.toFixed(2)}
                                </span>
                            </div>
                            
                            <button 
                                className="w-full mt-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-emerald-900/20"
                                
                                onClick={handleClearItemsInOrder}
                            >
                                Place an order
                            </button>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-gray-500 text-center">
                            {
                                cart.length > 0 ? (
                                    <div>
                                        <p className="text-2xl">Choose an item to add in order <span className="font-bold font-mono">(click on it)</span></p>
                                    </div>
                                ) : (
                                    <div>
                                        <h1 className="text-2xl">Add <span className="text-gray-300">something</span> in your cart</h1>
                                    </div>                           
                                )
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    </motion.div>
    )
}
