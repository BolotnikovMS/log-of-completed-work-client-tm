import cn from 'classnames'
import { type FC } from 'react'
import { IPropsTooltip } from './tooltip.interface'

const Tooltip: FC<IPropsTooltip> = ({ children, text, className, ...attr }) => {
	return (
		<div className={cn('lg:tooltip', className)} data-tip={text} {...attr}>
			{children}
		</div>
	)
}

export default Tooltip
