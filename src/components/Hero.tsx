'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import { useCartStore } from '@/store/cartStore'
import { useFilterStore } from "@/store/filterStore"

export default function Hero() {
    const cart = useCartStore((state) => state.cart)
    const searchQuery = useFilterStore((state) => state.searchQuery)
    const setSearchQuery = useFilterStore((state) => state.setSearchQuery)

    return (
        <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
        >
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 m-4 sm:m-6">
                <Link href={"/"}>
                    <h1 className="text-center text-3xl sm:text-4xl font-mono font-bold bg-clip-text text-transparent bg-linear-to-r from-emerald-600 to-blue-500">
                        Lite Shop
                    </h1>
                </Link>

                <div className="flex flex-col items-center w-full max-w-md px-4">
                    <input
                        value={searchQuery}
                        type="text"
                        placeholder="Search products..."
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="rounded-full w-full px-6 py-2 bg-[#050505] border border-white/20 text-center text-white placeholder:text-gray-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
                    />
                </div>

                <Link href={"/pages/cart"} className="flex gap-2 m-4">
                    <p className="flex justify-center items-center w-20 sm:w-24 h-10 sm:h-12 text-white text-base sm:text-2xl font-bold font-mono bg-linear-120 from-emerald-600 to-blue-500 rounded-xl sm:rounded-2xl hover:underline hover:scale-105 transition-all">
                        Cart
                    </p>
                    <span className="text-lg text-transparent bg-clip-text bg-linear-30 from-emerald-600 to-blue-500 font-bold">
                        {cart.length}
                    </span>
                </Link>
            </div>
        </motion.header>
    )
}
