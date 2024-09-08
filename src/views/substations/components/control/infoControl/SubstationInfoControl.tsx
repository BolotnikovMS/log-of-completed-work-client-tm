import { useState, type FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Icon, Modal } from '../../../../../components'
import { ERoles } from '../../../../../enums/roles.enum'
import { checkRole } from '../../../../../helpers'
import { useModal } from '../../../../../hooks'
import { useAuthStore } from '../../../../../store/auth'
import { SubstationForm, UploadSubstationFile } from '../../index'
import { IPropsSubstationInfoControl } from './substationInfoControl.interface'

const SubstationInfoControl: FC<IPropsSubstationInfoControl> = ({ substation }) => {
  const navigate = useNavigate()
  const { authUser } = useAuthStore()
  const isAdminOrModerator = checkRole(authUser, [ERoles.Moderator, ERoles.Admin])
  const { isModal, toggleModal } = useModal()
  const { isModal: isModalEdit, toggleModal: toggleModalEdit } = useModal()
  const [isEdited, setIsEdited] = useState<boolean>(false)

  return (
    <div className="work-log__control">
      <div className="control__wrapper !justify-start">
        <Button onClick={() => navigate(-1)}>
          <Icon id='arrow-left' />
          Обратно
        </Button>
        <Link to={`/completed-works?substation=${substation?.id}`} className='mBtn btn-sm'>
          <Icon id='note' />
          Работы
          ({substation?.numberCompletedWorks})
        </Link>
        <Button onClick={toggleModal}>
          <Icon id='file-add' />
          Добавить файл
        </Button>
        {isAdminOrModerator && (
          <Button onClick={() => { toggleModalEdit(), setIsEdited(!isEdited) }}>
            <Icon id='edit' />
            Редактировать
          </Button>
        )}

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
          content={<SubstationForm substation={substation} isEdited={isEdited} setIsEdited={setIsEdited} toggleModal={toggleModalEdit} />}
        />
      </div>
    </div>
  )
}

export default SubstationInfoControl
