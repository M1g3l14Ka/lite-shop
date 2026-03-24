'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import { useCartStore } from '@/store/cartStore'
import { useState } from "react"

export default function Hero() {

    const cart = useCartStore((state) => state.cart)
    const [filterItem, setFilterItem] = useState('')


    return(
        <motion.header
            initial={{opacity:0, y:20}}
            animate={{opacity:1, y:0}}
            transition={{duration:0.8}}
            className="w-full"
        >
            <div className="flex justify-between items-center m-4 gap-6">
                
                <Link href={"/"}>
                    <h1 className="text-center text-4xl font-mono font-bold bg-clip-text text-transparent bg-linear-to-r from-emerald-600 to-blue-500 m-6">
                        Lite Shop
                    </h1>
                </Link>
                

                <div className="flex flex-col items-center text-2xl font-mono rounded-xl">
                    <div className="mx-2 rounded-full p-2">
                        <input 
                            value={filterItem}
                            type="text" 
                            placeholder="What are u looking ?"
                            onChange={(e) => setFilterItem(e.target.value)}
                            className="rounded-full w-2xl bg-[#050505] py-2 border border-white text-center text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-blue-500"
                            onKeyDown={
                                (e) => e.key === "Enter" 
                            }
                        />
                    </div>
                </div>


                <div className="flex justify-around w-auto m-4 gap-12">
                    <div className="flex text-lg gap-1 text-transparent bg-clip-text bg-linear-30 from-emerald-600 to-blue-500 hover:scale-110">
                        <Link href={"/pages/cart"}>
                            <p className="flex justify-center items-center w-24 h-12 text-white text-2xl font-bold font-mono bg-linear-120 from-emerald-600 to-blue-500 rounded-2xl hover:underline ">
                                Cart
                            </p>
                        </Link>
                        <span>{cart.length}</span>
                    </div>
                </div>
            </div>

        </motion.header>
    )
}
