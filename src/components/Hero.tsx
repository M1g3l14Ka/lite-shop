'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import { useCartStore } from '@/store/cartStore'
import { useFilterStore } from "@/store/filterStore"

export default function Hero() {

    const cart = useCartStore((state) => state.cart)
    const searchQuery = useFilterStore((state) => state.searchQuery)
    const setSearchQuery = useFilterStore((state) => state.setSearchQuery)    

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
                

                <div className="flex flex-col items-center lg:flex-wrap text-2xl font-mono rounded-xl mt-2">
                    <input 
                        value={searchQuery}
                        type="text" 
                        placeholder="What are u search looking ?"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="rounded-full w-5xl bg-[#050505] py-2 border border-white text-center text-white"
                    />
                </div>


                <div className="flex justify-around w-auto m-4 gap-12">
                    <div className="flex text-lg text-transparent bg-clip-text bg-linear-30 from-emerald-600 to-blue-500">
                        <div>
                            <Link href={"/pages/cart"}>
                                <p className="flex justify-center items-center w-24 h-12 text-white text-2xl font-bold font-mono bg-linear-120 from-emerald-600 to-blue-500 rounded-2xl hover:underline hover:scale-110">
                                    Cart
                                </p>
                            </Link>
                        </div>
                        <span className="ml-1 text-lg ">{cart.length}</span>
                    </div>
                </div>
            </div>

        </motion.header>
    )
}
