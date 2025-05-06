import cn from 'classnames'
import { type FC } from 'react'
import { IPropsSelect } from './select.interface'
import './select.scss'

const Select: FC<IPropsSelect> = ({ className, children, ...attributes }) => {
	return (
		<div className={cn('mSelect', className)}>
			<select
				className="appearance-none w-full bg-transparent placeholder:text-gray-400"
				defaultValue={'default'}
				{...attributes}
			>
				{children ??
					<option disabled value={'default'}>Данных нет</option>
				}
			</select>
		</div>
	)
}

export default Select
