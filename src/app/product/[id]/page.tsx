import { Product } from "@/types/types";
import Image from "next/image";
import { notFound } from "next/navigation";
import { fetchProductById } from "@/api/products";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    
    let product: Product;
    try {
        product = await fetchProductById(id);
    } catch {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative aspect-square">
                    <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-3xl font-bold">{product.title}</h1>
                    <p className="text-gray-600">{product.description}</p>
                    <p className="text-2xl font-semibold">${product.price}</p>
                </div>
            </div>
        </div>
    );
}