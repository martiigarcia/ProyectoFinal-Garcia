import React, {useState, useEffect} from 'react'

const useCounter = (initialValue, quantity, stock) => {
    const [count, setCount] = useState(initialValue)

    useEffect(() => {
        if (initialValue !== quantity) {
            setCount(quantity)
        }
    }, []);

    const increment = () => {
        count < stock && setCount(count + 1)
    }

    const decrement = () => {
        count > initialValue && setCount(count - 1)
    }

    const remove = () => {
        setCount(count - 1)
    }

    return {
        count,
        increment: increment,
        decrement: decrement,
        remove: remove
    }
}

export default useCounter