/**
 * List các service logging trên console (nên hạn chế số lượng)
 */
export const SERVICE_DEBUG: string[] = [
    'fetchProductInfo',
    'addToCart',
    'fetchCart',
    'fetchProductResult',
    'fetchProductSearch',
    'createOrder',
    'fetchUserWishlist',
    'trackingOrder',
    'addAllToCart',
    'fetchCartCheckout',
    'fetchShippingInfo',
    'postLoginSocial',
    'fetch3Review',
];

/**
 * Define error code cho các TH không có status trả về từ axios
 */
export enum ERROR_CODE {
    NO_NETWORK = -1,
    TIME_OUT = -2,
    SERVER_ERR = -3,
}
