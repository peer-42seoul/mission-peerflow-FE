import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from 'react'

type ReturnTypes<T> = [
  T,
  (e: ChangeEvent<HTMLInputElement>) => void,
  Dispatch<SetStateAction<T>>,
]

const useInput = <T>(Data: T): ReturnTypes<T> => {
  const [value, setValue] = useState(Data)

  const inputHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }, [])

  return [value, inputHandler, setValue]
}

export default useInput
