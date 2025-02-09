import { useEffect, useState } from 'react'
import { getCurrentTheme, setCurrentTheme } from '../../helpers/localstorege.helper'
import { TTheme } from '../../types'

export const useTheme = () => {
	const [theme, setTheme] = useState<TTheme>('light')

	useEffect(() => {
		const currentTheme = getCurrentTheme('theme')

		setTheme(currentTheme)
		document.documentElement.setAttribute('data-theme', currentTheme)
	}, [])

	const toggleTheme = () => {
		setTheme(prev => {
			const newTheme = prev == 'light' ? 'dark' : 'light'

			setCurrentTheme('theme', newTheme)
			document.documentElement.setAttribute('data-theme', newTheme)

			return newTheme
		})
	}

	return { theme, toggleTheme }
}
