import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

type ReturnType<T> = [
	T | undefined,
	React.Dispatch<React.SetStateAction<T | undefined>>
]

const useLocalStorage = <T>(key: string, initialValue?: T): ReturnType<T> => {
	const [state, setstate] = useState<T | undefined>(
		() => {
			if(!initialValue) return
			try {
				const value = localStorage.getItem(key)
				return value ? JSON.parse(value) : initialValue
			} catch (error) {
				return initialValue
			}
		}
	)

	useEffect(() => {
		if(state) {
			localStorage.setItem(key, JSON.stringify(state))
		}
	}, [state, key])

  return [state, setstate]
}

export default useLocalStorage