import {useEffect} from 'react'

export default function useTimeout(callback, delay) {

  useEffect(() => {
    const timeout = setTimeout(() => {
      callback()
    }, delay)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

}