import cn from 'classnames'
import React from 'react'
import { IPropsLoader } from './loader.interface'
import './loader.scss'

export const Loader: React.FC<IPropsLoader> = ({ className }) => {
	return (
		<div className={cn('loader-spinner__wrapper', className)}>
			<span className='loader-spinner !bg-blue-300'></span>
		</div>
	)
}
