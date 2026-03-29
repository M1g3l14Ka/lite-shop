'use client'

import Image from "next/image"
import Link from "next/link"

import { motion } from "framer-motion"
import { useCartStore } from "@/store/cartStore"
import { Product } from "@/types/types"
import { useState, useEffect } from "react"
import { fetchProductsCacheWithSignal } from "@/api/products"

export default function Products() {
    const [productsData, setProductsData] = useState<Product[]>([])
    const [loadingData, setLoadingData] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const addToCart = useCartStore((state) => state.addToCart)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoadingData(true)
                setError(null)

                const controller = new AbortController()
                const timeoutId = setTimeout(() => controller.abort(), 5000)

                const data = await fetchProductsCacheWithSignal(controller.signal)
                clearTimeout(timeoutId)

                if (!data || !Array.isArray(data.products)) {
                    throw new Error('Invalid data structure')
                }

                setProductsData(data.products)

            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Unknown error'
                setError(errorMessage)
                console.error('Fetch error:', err)
            } finally {
                setLoadingData(false)
            }
        }

        fetchProducts()
    }, [])

    if (loadingData && productsData.length === 0) {
        return <div className="text-center text-white">Loading...</div>
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>
    }

    return (
        <motion.div>
            <div className="w-full min-h-screen p-4">
                {productsData.map((product) => (
                    <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        className="block"
                    >
                        <div
                            className="flex justify-between items-center w-auto h-auto gap-4 border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
                        >
                            <div className="relative w-32 h-32">
                                <Image
                                    fill
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold">{product.title}</h3>
                                <p className="text-gray-600">${product.price}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </motion.div>
    )
}