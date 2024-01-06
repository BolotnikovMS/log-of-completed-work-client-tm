import { type FC, type ReactNode } from 'react'
import { Button, Modal } from '..'

import { Plus } from 'lucide-react'
import { useModal } from '../../hooks'

interface IPropsControlPanel {
	titleModal: string
	formModal: ReactNode
}

const ControlPanel: FC<IPropsControlPanel> = ({ titleModal, formModal }) => {
	const { isModal, toggleModal } = useModal()

	return (
		<div className="work-log__control">
			<Button classBtn='btn-bg_green' onClick={() => console.log(1)}>
				<Plus />
			</Button>
			<Modal
				visible={isModal}
				title={titleModal}
				content={formModal}
				onToggle={toggleModal}
			/>
		</div>
	)
}

export default ControlPanel