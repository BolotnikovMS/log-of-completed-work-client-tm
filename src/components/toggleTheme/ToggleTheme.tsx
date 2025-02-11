import { memo, type FC } from 'react'
import { Icon, Toggle } from '..'
import { useTheme } from '../../hooks'

const ToggleTheme: FC = memo(() => {
	const { theme, toggleTheme } = useTheme()

	return (
		<label className="flex items-center cursor-pointer gap-2">
			<Icon id='sun' className={`!w-6 !h-6 ${theme === 'light' ? 'icon-theme__light' : ''}`} />
			<Toggle
				idToggle='theme-controller'
				className='theme-controller'
				value={theme}
				checked={theme === 'dark'}
				onChange={toggleTheme}
			/>
			<Icon id='moon' className={`!w-6 !h-6 ${theme === 'dark' ? 'icon-theme__dark' : ''}`} />
		</label>
	)
})

export default ToggleTheme
