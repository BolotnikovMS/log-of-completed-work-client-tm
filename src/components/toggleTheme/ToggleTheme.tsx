import { memo, type FC } from 'react'
import { Icon, Toggle } from '..'
import { useTheme } from '../../hooks'

const ToggleTheme: FC = memo(() => {
	const { theme, toggleTheme } = useTheme()

	return (
		<label className="flex items-center cursor-pointer gap-2">
			<Icon id='sun' />
			<Toggle
				idToggle='theme-controller'
				className='theme-controller'
				value={theme}
				checked={theme === 'dark'}
				onChange={toggleTheme}
			/>
			<Icon id='moon' />
		</label>
	)
})

export default ToggleTheme
