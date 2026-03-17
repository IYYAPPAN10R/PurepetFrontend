import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const CartContext = createContext()

const STORAGE_KEY = 'pp_cart'

function loadCart() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        return raw ? JSON.parse(raw) : []
    } catch {
        return []
    }
}

function saveCart(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function CartProvider({ children }) {
    const [cart, setCart] = useState(loadCart)

    // Persist on every change
    useEffect(() => {
        saveCart(cart)
    }, [cart])

    const addToCart = useCallback((product) => {
        setCart(prev => {
            const existing = prev.find(i => i.product._id === product._id)
            if (existing) {
                if (existing.quantity >= product.countInStock) {
                    import('react-hot-toast').then(({ toast }) => {
                        toast.error(`Only ${product.countInStock} available. Limit reached!`)
                    })
                    return prev
                }
                return prev.map(i =>
                    i.product._id === product._id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                )
            }
            if (product.countInStock < 1) {
                import('react-hot-toast').then(({ toast }) => {
                    toast.error('Item is out of stock.')
                })
                return prev
            }
            return [...prev, { product, quantity: 1 }]
        })
    }, [])

    const removeFromCart = useCallback((productId) => {
        setCart(prev => prev.filter(i => i.product._id !== productId))
    }, [])

    const updateQty = useCallback((productId, qty) => {
        setCart(prev => {
            const item = prev.find(i => i.product._id === productId)
            if (!item) return prev
            
            let n = parseInt(qty) || 1
            if (n > item.product.countInStock) {
                import('react-hot-toast').then(({ toast }) => {
                    toast.error(`Only ${item.product.countInStock} available. Limit reached!`)
                })
                n = item.product.countInStock
            }
            n = Math.max(1, n)
            
            return prev.map(i => i.product._id === productId ? { ...i, quantity: n } : i)
        })
    }, [])

    const clearCart = useCallback(() => {
        setCart([])
    }, [])

    const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0)

    return (
        <CartContext.Provider value={{ cart, cartCount, addToCart, removeFromCart, updateQty, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const ctx = useContext(CartContext)
    if (!ctx) throw new Error('useCart must be used within CartProvider')
    return ctx
}
