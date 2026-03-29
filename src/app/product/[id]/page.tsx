'use client';

import { Product } from "@/types/types";
import Image from "next/image";
import { notFound } from "next/navigation";
import { fetchProductById } from "@/api/products";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { calculateDiscountPrice } from '@/utils/priceUtils';
import { motion } from "framer-motion";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const addToCart = useCartStore((state) => state.addToCart);
    const discountPrice = calculateDiscountPrice(product?.price || 0, product?.discountPercentage || 0);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const { id } = await params;
                const data = await fetchProductById(id);
                setProduct(data);
            } catch {
                notFound();
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [params]);

    if (loading) {
        return <div className="text-center text-white">Loading...</div>;
    }

    if (!product) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full p-3 sm:p-4"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                className="flex flex-col lg:flex-row justify-center items-center gap-4 sm:gap-6 lg:gap-8 rounded-2xl p-4 sm:p-6 bg-[#101010]"
            >
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative w-full max-w-xs mx-auto lg:mx-0"
                >
                    <Image
                        src={product.thumbnail}
                        alt={product.title}
                        width={512}
                        height={512}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                        className="object-contain w-full h-full rounded-lg"
                        style={{ width: '100%', height: 'auto' }}
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col justify-center items-center lg:items-start gap-3 sm:gap-4 text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-blue-500 w-full max-w-xs mx-auto lg:max-w-none lg:w-auto px-2 sm:px-4 lg:px-0"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                        className="text-xl sm:text-2xl lg:text-3xl font-bold text-center lg:text-left"
                    >
                        {product.title}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 }}
                        className="text-xs sm:text-sm lg:text-base text-gray-300 text-center lg:text-left line-clamp-3 lg:line-clamp-none"
                    >
                        {product.description}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 }}
                        className="flex justify-center lg:justify-start items-center gap-2 sm:gap-3 text-sm sm:text-base lg:text-lg"
                    >
                        <p className="line-through text-gray-500">${product.price}</p>
                        <p className="text-xs sm:text-sm">-{product.discountPercentage}%</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.7 }}
                        className="underline"
                    >
                        <p className="text-lg sm:text-xl lg:text-2xl text-center lg:text-left font-semibold">${discountPrice}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.8, type: "spring", stiffness: 200 }}
                        className="flex justify-center items-center my-2 sm:my-4 w-full"
                    >
                        <button
                            className="w-full max-w-xs text-base sm:text-lg lg:text-xl text-white font-bold font-mono border h-10 sm:h-12 rounded-2xl bg-linear-30 from-emerald-400 to-blue-500 hover:from-emerald-500 hover:to-blue-600 transition-colors hover:scale-105"
                            onClick={() => addToCart(product)}
                        >
                            Add to cart
                        </button>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
