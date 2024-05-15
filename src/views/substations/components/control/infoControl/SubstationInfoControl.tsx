import { Paperclip } from 'lucide-react'
import { type FC } from 'react'
import { Button, Modal } from '../../../../../components'
import { useModal } from '../../../../../hooks'
import { UploadSubstationFile } from '../../index'

const SubstationInfoControl: FC = () => {
	const { isModal, toggleModal } = useModal()

	return (
		<div className="work-log__control">
			<div className="control__wrapper">
				<Button onClick={toggleModal}>
					<Paperclip />
				</Button>
				<Modal
					visible={isModal}
					title='Добавление файла'
					content={<UploadSubstationFile toggleModal={toggleModal} />}
					onToggle={toggleModal}
				/>
			</div>
		</div>
	)
}

export default SubstationInfoControl