import React, {createContext, useState} from 'react'

const Context = createContext();


export const ContextProvider = ({children}) => {
    const [cart, setCart] = useState([])

    const addItem = (productToAdd, quantity) => {
        if (isInCart(productToAdd.id)) {
            const updatedCart = cart.map((product) => {
                if (product.id === productToAdd.id) {
                    return {...product, quantity: product.quantity + quantity};
                }
                return product;
            });
            setCart(updatedCart);
        } else {
            const newProduct = {
                ...productToAdd,
                quantity
            };
            setCart([...cart, newProduct]);
        }
    };

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
        cart.forEach((product) => {
            total = total + product.quantity
        })
        return total;
    }

    const currentQuantity = (productId) => {
        // obtenemos el producto
        const product = cart.find((item) => item.id === productId);
        // retornamos la cantidad de items del producto, si el producto no está en el carrito, entonces es 0
        return product ? product.quantity : 0;
    };

    return (
        <Context.Provider
            value={{
                cart,
                addItem,
                removeItem,
                getTotal,
                clearCart,
                getQuantity,
                currentQuantity
            }}
        >
            {children}
        </Context.Provider>
    )
}

export default Context