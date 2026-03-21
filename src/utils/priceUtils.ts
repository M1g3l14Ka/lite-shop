export function calculateDiscountPrice(price: number, discountPercentage: number): number {
    return Number((price - (price * (discountPercentage / 100))).toFixed(2));
}
