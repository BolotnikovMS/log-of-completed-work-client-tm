import { useState, type FC } from 'react'
import { Link } from 'react-router-dom'
import { Button, Dropdown, Icon, Modal } from '../../../../../components'
import { ERoles } from '../../../../../enums/roles.enum'
import { checkRole } from '../../../../../helpers'
import { useModal } from '../../../../../hooks'
import { useAuthStore } from '../../../../../store/auth'
import { ChannelForm } from '../../../../channel/components'
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

  return (
    <div className="work-log__control">
      <div className="control__wrapper !justify-start">
        <Link to={`/completed-works?substation=${substation?.id}`} className='mBtn btn-sm'>
          <Icon id='note' />
          Работы
          ({substation?.numberCompletedWorks})
        </Link>
        <Dropdown
          classMenu='dropdown-bottom dropdown-start'
          children={
            <>
              <Icon id='setting' />
              Действие
            </>
          }
          menuItems={[
            <Button onClick={toggleModal}>
              <Icon id='file-add' />
              Добавить файл
            </Button>,
            isAdminOrModerator && (
              <Button onClick={() => { toggleModalEdit(), setIsEdited(!isEdited) }}>
                <Icon id='edit' />
                Редактировать
              </Button>),
            isAdminOrModerator && (
              <Button onClick={() => { toggleModalAddChannel() }}>
                <Icon id='network' />
                Добавить канал
              </Button>),
            isAdminOrModerator && (
              <Button onClick={() => { toggleModalAddNote(), setIsEdited(!isEdited) }}>
                <Icon id='note-add' />
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
          content={<SubstationForm data={substation} isEdited={isEdited} setIsEdited={setIsEdited} toggleModal={toggleModalEdit} />}
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
