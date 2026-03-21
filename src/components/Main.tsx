'use client'


import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Products } from "@/types/types"
import { useCartStore } from '@/store/cartStore'
import Image from "next/image"
import { calculateDiscountPrice } from '@/utils/priceUtils'

export default function Main() {

    const [productsData, setProductsData] = useState<Products[]>([])

    const addToCart = useCartStore((state) => state.addToCart)

    useEffect(() => {
        fetch(`https://dummyjson.com/products`)
        .then((res) => {
            if(!res.ok) {
                throw new Error('Error NOOOOOB!')
            }
            return res.json();
        })
        .catch((err) => {
            console.log(err)
        })
        .then((data) => {
            setProductsData(data.products)
            console.log(data)
        })
    }, [])

    return (
      <main className="p-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {productsData.map((prod: Products) => {
            const discountPrice = calculateDiscountPrice(prod.price, prod.discountPercentage);

            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                key={prod.id}
                className="flex flex-col bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-emerald-500/50 transition-colors group hover:shadow-sm hover:shadow-white/40 "
              >
                <div className="relative aspect-square w-full mb-4 overflow-hidden rounded-xl bg-white/5">
                  <Image
                    width={512}
                    height={512}
                    src={prod.thumbnail}
                    alt={prod.title}
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <div className="flex flex-col justify-center items-center text-2xl text-center text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-blue-500">
                  <h3 className="text-lg font-bold mb-2 line-clamp-1">{prod.title}</h3>

                  <div className="flex justify-center items-center gap-12">
                    <p className="text-lg text-gray-500 line-through">${prod.price}</p>
                    <p className="text-lg">-{prod.discountPercentage}%</p>
                  </div>

                  <div>
                    <p>${discountPrice}</p>
                  </div>

                  <div className="flex justify-center items-center ">
                    <p><span className="text-lg">⭐</span>{prod.rating}</p>
                  </div>

                  <button
                    className="mt-4 w-52 bg-linear-30 from-blue-500 to-emerald-500 text-white font-bold font-mono py-2 rounded-xl transition-all hover:scale-105"
                    onClick={() => addToCart(prod)}
                  >
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>
    )

}
