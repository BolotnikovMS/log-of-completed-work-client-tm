import cx from 'classnames'
import { Button, Tooltip } from '..'
import { IPropsDropdown } from './dropdown.interface'

const Dropdown = ({ children, menuItems, classMenu, classBtnTrigger, tooltipText }: IPropsDropdown) => {
	return (
		<div className={cx('dropdown', classMenu ?? 'dropdown-top dropdown-end')}>
			<Tooltip text={tooltipText || 'Подсказки нет'}>
				<Button tabIndex={0} className={cx('mBtn', classBtnTrigger)} onClick={(e) => { e.stopPropagation() }}>
					{children}
				</Button>
			</Tooltip>
			<ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 m-2 gap-1 shadow">
				{menuItems.map((item, i) => (
					item && (
						<li key={i}>
							{item}
						</li>)
				))}
			</ul>
		</div>
	)
}

export default Dropdown
