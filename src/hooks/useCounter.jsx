import React, {useState, useEffect} from 'react'

const useCounter = (initialValue, maxAvailable) => {
    const [count, setCount] = useState(initialValue)

    const increment = () => {
        count < maxAvailable && setCount(count + 1)
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