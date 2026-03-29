import { Product } from "@/types/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function fetchProductsCacheWithSignal(signal: AbortSignal): Promise<{ products: Product[] }> {
    const response = await fetch(API_URL, { signal });

    if (!response.ok) {
        if (response.status === 401) throw new Error('Unauthorized (401)');
        if (response.status === 404) throw new Error('Not found (404)');
        if (response.status >= 500) throw new Error('Server error (500)');
        throw new Error(`HTTP error: ${response.status}`);
    }

    return response.json();
}

export async function fetchProductById(id: string, signal?: AbortSignal): Promise<Product> {
    const response = await fetch(`${API_URL}/${id}`, { signal });

    if (!response.ok) {
        if (response.status === 404) throw new Error('Product not found');
        throw new Error(`HTTP error: ${response.status}`);
    }

    return response.json();
}
