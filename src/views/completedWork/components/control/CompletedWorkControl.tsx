import { Plus } from 'lucide-react'
import { type FC } from 'react'
import { CompletedWorkFilters, CompletedWorkForm } from '..'
import { Button, Modal } from '../../../../components'
import { useModal } from '../../../../hooks'

const CompletedWorkControl: FC = () => {
	const { isModal, toggleModal } = useModal()

	return (
		<div className="work-log__control control">
			<div className="control__wrapper">
				<Button classBtn='btn-bg_green' onClick={() => toggleModal()}>
					<Plus />
				</Button>
				<Modal
					visible={isModal}
					title='Форма добавления выполненной работы'
					content={<CompletedWorkForm toggleModal={toggleModal} />}
					onToggle={toggleModal}
				/>
				<CompletedWorkFilters />
			</div>
		</div>
	)
}

export default CompletedWorkControl