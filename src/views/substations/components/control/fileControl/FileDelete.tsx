import cn from 'classnames'
import { type FC } from 'react'
import { Button, Icon, Loader, Tooltip } from '../../../../../components'
import { ERoles } from '../../../../../enums/roles.enum'
import { checkRole } from '../../../../../helpers'
import { useDeleteFile } from '../../../../../hooks'
import { useAuthStore } from '../../../../../store/auth'
import { TFileList } from '../../../../../types'
import { IPropsFileDelete } from './fileDelete.interface'

const FileDelete: FC<IPropsFileDelete> = ({ file, classBtn }) => {
	const { authUser } = useAuthStore()
	const { deleteFile } = useDeleteFile()
	const isAdminOrModerator = checkRole(authUser, [ERoles.Moderator, ERoles.Admin])

	if (!isAdminOrModerator) return null

	const handleDeleteFile = (file: TFileList | null) => {
		if (!file) return null

		const answer = confirm(`Подтвердите удаление файла: ${file.clientName}`)

		if (!answer) return null

		return deleteFile.mutate(file.id)
	}

	if (deleteFile.isPending) return <Loader />

	return (
		<Tooltip text='Удалить' className='!tooltip-bottom'>
			<Button className={cn('mBtn_error', classBtn)} onClick={() => handleDeleteFile(file)}>
				<Icon id='delete' />
			</Button>
		</Tooltip>
	)
}

export default FileDelete
