import { useCallback, useState } from 'react'
import { decryptObj, encryptObj } from '../util/crypto-util'

export const useLocalStorage = <T>(
    key: string,
    initialValue: T
): [T, typeof setValue] => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = decryptObj(
                window.localStorage.getItem(key)!,
                initialValue
            )
            return item ? item : initialValue
        } catch (error) {
            return initialValue
        }
    })
    const setValue = useCallback(
        (value: T) => {
            try {
                const valueToStore =
                    value instanceof Function ? value(storedValue) : value
                setStoredValue(valueToStore)
                window.localStorage.setItem(key, encryptObj(valueToStore))
            } catch (error) {
                console.log(error)
            }
        },
        [key, storedValue]
    )

    return [storedValue, setValue]
}
