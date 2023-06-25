import { Dispatch, SetStateAction, useState } from 'react'

type ReturnTypes<T> = [T, (e: any) => void, Dispatch<SetStateAction<T>>]

const useInput = <T>(Data: T): ReturnTypes<T> => {
  const [value, setValue] = useState(Data)

  const handler = (e: any) => {
    setValue(e.target.value)
  }
  return [value, handler, setValue]
}

export default useInput
