import { useCallback, useState, type FC } from 'react'
import { Link } from 'react-router-dom'
import { Button, Dropdown, Error, Icon, Loader, Modal } from '../../../../../components'
import { pageConfig } from '../../../../../config/pages.config'
import { ERoles } from '../../../../../enums/roles.enum'
import { checkRole } from '../../../../../helpers'
import { useModal, useSubstation } from '../../../../../hooks'
import { useAuthStore } from '../../../../../store/auth'
import { ChannelForm } from '../../../../channel/components'
import DefectsNumber from '../../defectsNumber/DefectsNumber'
import { SubstationForm, SubstationNote, UploadSubstationFile } from '../../index'
import { IPropsSubstationInfoControl } from './substationInfoControl.interface'

const SubstationInfoControl: FC<IPropsSubstationInfoControl> = ({ substation }) => {
	const { authUser } = useAuthStore()
	const isAdminOrModerator = checkRole(authUser, [ERoles.Moderator, ERoles.Admin])
	const { isModal, toggleModal } = useModal()
	const { isModal: isModalEdit, toggleModal: toggleModalEdit } = useModal()
	const { isModal: isModalAddChannel, toggleModal: toggleModalAddChannel } = useModal()
	const { isModal: isModalAddNote, toggleModal: toggleModalAddNote } = useModal()
	const [isEdited, setIsEdited] = useState<boolean>(false)
	const { data, error, isLoading, isError } = useSubstation(substation.id, {
		enabled: isModalEdit
	})

	const handleEdit = useCallback(() => {
		setIsEdited(!isEdited)
		toggleModalEdit()
	}, [isEdited, toggleModalEdit])

	const modalEditContent =
		isLoading ?
			<Loader /> :
			isError ?
				<Error error={error} /> :
				<SubstationForm
					data={data}
					toggleModal={toggleModalEdit}
					isEdited={isModalEdit}
					setIsEdited={setIsEdited}
				/>

	return (
		<div className="work-log__control">
			<div className="control__wrapper !justify-start">
				<Link to={`${pageConfig.completedWorks}?substation=${substation.id}`} className='mBtn btn-sm'>
					<Icon id='note' />
					Работы
					({substation?.numberCompletedWorks})
				</Link>
				<DefectsNumber keyDefectSubstation={substation.keyDefectSubstation} />
				<Dropdown
					classMenu='dropdown-bottom dropdown-start'
					children={<Icon id='setting' aria-label='Иконка действий' />}
					tooltipText='Действие'
					menuItems={[
						<Button onClick={toggleModal} aria-label='Кнопка вызова модального окна для добавления файла'>
							<Icon id='file-add' aria-label='Иконка добавления файла' />
							Добавить файл
						</Button>,
						isAdminOrModerator && (
							<Button onClick={handleEdit} aria-label='Кнопка вызова модального окна для редактирования данных'>
								<Icon id='edit' aria-label='Иконка редактирования' />
								Редактировать
							</Button>),
						isAdminOrModerator && (
							<Button onClick={() => { toggleModalAddChannel() }} aria-label='Кнопка вызова модального окна для добавления канала'>
								<Icon id='network' aria-label='Иконка добавления канала' />
								Добавить канал
							</Button>),
						isAdminOrModerator && (
							<Button onClick={() => { toggleModalAddNote(), setIsEdited(!isEdited) }} aria-label='Кнопка вызова модального окна для добавления или удаления примечания'>
								<Icon id='note-add' aria-label='Иконка добавления примечания' />
								Примечание
							</Button>)
					]}
				/>

				<Modal
					visible={isModal}
					title='Добавление файла'
					content={<UploadSubstationFile toggleModal={toggleModal} />}
					onToggle={toggleModal}
				/>
				<Modal
					visible={isModalEdit}
					title='Редактирование записи'
					onToggle={() => { toggleModalEdit(), setIsEdited(false) }}
					content={modalEditContent}
				/>
				<Modal
					visible={isModalAddChannel}
					title='Добавление канала'
					onToggle={toggleModalAddChannel}
					content={<ChannelForm toggleModal={toggleModalAddChannel} />}
				/>
				<Modal
					visible={isModalAddNote}
					title='Добавление примечание'
					onToggle={toggleModalAddNote}
					content={<SubstationNote data={substation} isEdited={isEdited} setIsEdited={setIsEdited} toggleModal={toggleModalAddNote} />}
				/>
			</div>
		</div>
	)
}

export default SubstationInfoControl
