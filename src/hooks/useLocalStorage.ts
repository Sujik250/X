import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

type TUseLocalStorage<T> = {
  defaultValue: T
  key: string
}

export function useLocalStorage<T>({
  defaultValue,
  key
}: TUseLocalStorage<T>): [T, Dispatch<SetStateAction<T>>, boolean] {
  const [isLoading, setIsLoading] = useState(true)
  const isMounted = useRef(false)
  const [value, setValue] = useState<T>(defaultValue)

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const item = localStorage.getItem(key)
        if (item) {
          setValue(JSON.parse(item))
        }
      }
    } catch (error) {
      console.error('Error retrieving from localStorage:', error)
    } finally {
      setIsLoading(false)
    }

    return () => {
      isMounted.current = false
    }
  }, [key])

  useEffect(() => {
    if (isMounted.current) {
      try {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(value))
        }
      } catch (error) {
        console.error('Error saving to localStorage:', error)
      }
    } else {
      isMounted.current = true
    }
  }, [key, value])

  return [value, setValue, isLoading]
}