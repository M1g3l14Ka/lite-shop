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
        <main className="p-4 sm:p-6 lg:p-8 max-w-[100vw] mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 lg:gap-4">
                {filterProducts.map((prod: Products, index: number) => {
                    const discountPrice = calculateDiscountPrice(prod.price, prod.discountPercentage)
                
                    return (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            key={prod.id}
                            className="flex flex-col bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-2 sm:p-3 lg:p-4 hover:border-emerald-500/50 transition-colors group hover:shadow-sm hover:shadow-white/40"
                        >
                            <div className="relative aspect-square w-full mb-2 sm:mb-3 lg:mb-4 overflow-hidden rounded-lg sm:rounded-xl bg-white/5">
                                <Image
                                    width={512}
                                    height={512}
                                    src={prod.thumbnail}
                                    alt={prod.title}
                                    loading={index === 0 ? "eager" : "lazy"}
                                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                    
                            <div className="flex flex-col justify-center items-center text-center text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-blue-500">
                                <h3 className="text-base sm:text-lg font-bold mb-1 sm:mb-2 line-clamp-1">{prod.title}</h3>
                    
                                <div className="flex justify-center items-center gap-4 sm:gap-8 lg:gap-12 text-sm sm:text-lg">
                                    <p className="text-gray-500 line-through">${prod.price}</p>
                                    <p className="text-xs sm:text-base">-{prod.discountPercentage}%</p>
                                </div>
                    
                                <div className="text-base sm:text-lg">
                                    <p>${discountPrice}</p>
                                </div>
                    
                                <div className="flex justify-center items-center text-sm sm:text-lg">
                                    <p><span className="text-lg">⭐</span>{prod.rating}</p>
                                </div>
                    
                                <button
                                    className="mt-2 sm:mt-4 w-full max-w-50 bg-linear-30 from-blue-500 to-emerald-500 text-white text-xs sm:text-base font-bold font-mono py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-all hover:scale-105"
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
