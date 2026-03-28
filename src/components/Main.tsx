'use client'

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Products } from "@/types/types"
import { useCartStore } from '@/store/cartStore'
import Image from "next/image"
import { calculateDiscountPrice } from '@/utils/priceUtils'
import { useFilterStore } from "@/store/filterStore"
import { useDebounce } from "use-debounce"

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export default function Main() {

    const [productsData, setProductsData] = useState<Products[]>([])
    const [loadingData, setLoadingData] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const searchQuery = useFilterStore((state) => state.searchQuery)
    const [debouncedSearchQuery] = useDebounce(searchQuery, 500)

    const filterProducts = productsData.filter((prod) => {
        return prod.title.toLocaleLowerCase().includes(debouncedSearchQuery.toLowerCase())
    })

    const addToCart = useCartStore((state) => state.addToCart)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoadingData(true)
                setError(null)

                // ← 1. Сначала проверяем localStorage
                const cached = localStorage.getItem('products')
                if (cached) {
                    setProductsData(JSON.parse(cached))
                    setLoadingData(false)
                }

                // ← 2. AbortController для таймаута
                const controller = new AbortController()
                const timeoutId = setTimeout(() => controller.abort(), 5000)

                try {
                    // ← 3. Используем кэш-функцию + signal
                    const data = await fetchProductsCacheWithSignal(controller.signal)
                    
                    clearTimeout(timeoutId)

                    // ← 4. Проверяем структуру данных
                    if (!data || !Array.isArray(data.products)) {
                        throw new Error('Invalid data structure')
                    }

                    setProductsData(data.products)
                    localStorage.setItem('products', JSON.stringify(data.products))

                } catch (fetchErr) {
                    clearTimeout(timeoutId)
                    
                    if (fetchErr instanceof Error && fetchErr.name === 'AbortError') {
                        throw new Error('Request timed out. Please try again.')
                    }
                    throw fetchErr
                }

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

    // ← Рендер состояний
    if (loadingData && productsData.length === 0) {
        return <div className="text-center text-white">Loading...</div>
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>
    }

    return (
        <main className="p-4 max-w-7xl mx-auto">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {filterProducts.map((prod: Products, index: number) => {
                    const discountPrice = calculateDiscountPrice(prod.price, prod.discountPercentage)

                    return (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            key={prod.id}
                            className="flex flex-col justify-center items-center bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-emerald-500/50 transition-colors group hover:shadow-sm hover:shadow-white/40"
                        >
                            <div className="relative aspect-square w-full mb-4 overflow-hidden rounded-xl bg-white/5">
                                <Image
                                    width={512}
                                    height={512}
                                    src={prod.thumbnail}
                                    alt={prod.title}
                                    loading={index === 0 ? "eager" : "lazy"}  // ← первый eager, остальные lazy
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

                                <div className="flex justify-center items-center">
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
                    )
                })}
            </div>
        </main>
    )
}


async function fetchProductsCacheWithSignal(signal: AbortSignal): Promise<{ products: Products[] }> {
    const response = await fetch(API_URL, { signal })
    
    if (!response.ok) {
        if (response.status === 401) throw new Error('Unauthorized (401)')
        if (response.status === 404) throw new Error('Not found (404)')
        if (response.status >= 500) throw new Error('Server error (500)')
        throw new Error(`HTTP error: ${response.status}`)
    }
    
    return response.json()
}
