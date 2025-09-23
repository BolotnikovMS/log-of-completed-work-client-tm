import { useState, type FC } from 'react'
import { Button, Dropdown, Icon, Loader, Modal } from '../../../../../components'
import { ERoles } from '../../../../../enums/roles.enum'
import { checkRole } from '../../../../../helpers'
import { useDeleteFile, useModal } from '../../../../../hooks'
import { FileService } from '../../../../../services/file/file.service'
import { useAuthStore } from '../../../../../store/auth'
import { TFile } from '../../../../../types'
import RenameFile from '../../forms/renameFile/RenameFile'
import { IPropsFileControl } from './fileControl.interface'

const FileControl: FC<IPropsFileControl> = ({ file, classDropDown }) => {
	const { authUser } = useAuthStore()
	const { deleteFile } = useDeleteFile()
	const isAdminOrModerator = checkRole(authUser, [ERoles.Moderator, ERoles.Admin])
	const { isModal: isModalRename, toggleModal: toggleModalRename } = useModal()
	const [isEdited, setIsEdited] = useState<boolean>(false)

	const handleDownload = (file: TFile | null) => {
		if (!file) return null

		FileService.download(file)
	}
	const handleDeleteFile = (file: TFile | null) => {
		if (!file) return null

		const answer = confirm(`Подтвердите удаление файла: ${file.clientName}`)

		if (!answer) return null

		return deleteFile.mutate(file.id)
	}

	if (deleteFile.isPending) return <Loader />

	return (
		<>
			<Dropdown
				children={
					<Icon id='setting' />
				}
				tooltipText='Меню'
				classBtnTrigger='btn-circle'
				classMenu={classDropDown}
				menuItems={[
					<Button className='!justify-start' onClick={() => handleDownload(file)}>
						<Icon id='download' />
						Скачать
					</Button>,
					isAdminOrModerator &&
					<Button className='!justify-start' onClick={() => toggleModalRename()}>
						<Icon id='edit' />
						Переименовать
					</Button>,
					isAdminOrModerator &&
					<Button className='!justify-start mBtn_error' onClick={() => handleDeleteFile(file)}>
						<Icon id='delete' />
						Удалить
					</Button>
				]}
			/>
			<Modal
				visible={isModalRename}
				title='Добавление файла'
				content={<RenameFile data={file} isEdited={isEdited} setIsEdited={setIsEdited} toggleModal={toggleModalRename} />}
				onToggle={toggleModalRename}
			/>
		</>
	)
}

export default FileControl
