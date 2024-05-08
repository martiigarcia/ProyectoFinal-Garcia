import React, {createContext, useState} from 'react'

const Context = createContext();


export const ContextProvider = ({children}) => {
    const [cart, setCart] = useState([])

    const addItem = (productToAdd, quantity) => {

        if (isInCart(productToAdd.id)) {
            const updatedCart = cart.map((product) => {
                if (product.id === productToAdd.id) {
                    return {...product, quantity: quantity}
                }
                return product
            })
            setCart(updatedCart)
        } else {
            const newProduct = {
                ...productToAdd,
                quantity
            }
            setCart([...cart, newProduct])
        }
    }

    const isInCart = (id) => {
        return cart.some((prod) => prod.id === id)
    }


    const removeItem = (id) => {

        const updatedCart = cart.map((product) => {
            if (product.id === id) {
                if (product.quantity === 1) {
                    return null; // Eliminar el producto si la cantidad es igual a 1
                } else {

                    return {...product, quantity: product.quantity - 1}; // Restar uno de la cantidad si es mayor a 1
                }
            }
            return product;
        });

        // Filtrar los productos nulos y actualizar el carrito
        const filteredCart = updatedCart.filter((product) => product !== null);
        setCart(filteredCart);
    }

    const getTotal = () => {
        return (cart.reduce((acc, item) => acc + item.priceperpinta * item.quantity, 0))

    }

    const clearCart = () => {
        setCart([])
    }

    const getQuantity = () => {
        let total = 0
        cart.forEach((prod) => {
            total = total + prod.quantity
        })
        return total;
    }

    return (
        <Context.Provider
            value={{
                cart,
                addItem,
                removeItem,
                getTotal,
                clearCart,
                getQuantity
            }}
        >
            {children}
        </Context.Provider>
    )
}

export default Context