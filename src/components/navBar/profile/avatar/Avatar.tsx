import { memo, type FC } from 'react'
import Icon from '../../../icon/Icon'

const Avatar: FC = memo(() => {
	return (
		<div className="avatar placeholder">
			<div className="bg-neutral text-neutral-content w-7 rounded-full">
				<Icon id='user' />
			</div>
		</div>
	)
})

export default Avatar
