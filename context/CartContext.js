'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('panchagavya-cart');
        if (savedCart) {
            try {
                const parsed = JSON.parse(savedCart);
                if (Array.isArray(parsed)) {
                    setCart(parsed);
                }
            } catch (e) {
                console.error('Failed to parse cart from localStorage', e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('panchagavya-cart', JSON.stringify(cart));
        }
    }, [cart, isLoaded]);

    const addToCart = (product, quantity = 1) => {
        setCart(currentCart => {
            const existingItem = currentCart.find(item => item.id === product.id);

            if (existingItem) {
                return currentCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            return [...currentCart, { ...product, quantity }];
        });
    };

    const removeFromCart = (productId) => {
        setCart(currentCart => currentCart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setCart(currentCart =>
            currentCart.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getCartItemCount = () => {
        return cart.reduce((count, item) => count + item.quantity, 0);
    };

    const getTaxAmount = () => {
        const subtotal = getCartTotal();
        return subtotal * 0.05; // 5% GST
    };

    const getGrandTotal = () => {
        return getCartTotal() + getTaxAmount();
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getCartTotal,
                getCartItemCount,
                getTaxAmount,
                getGrandTotal
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
}
