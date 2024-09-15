import { type FC } from 'react'
import { UserForm } from '..'
import { Button, Icon, Modal } from '../../../../components'
import { ERoles } from '../../../../enums/roles.enum'
import { checkRole } from '../../../../helpers/checkRole.helper'
import { useModal } from '../../../../hooks'
import { useAuthStore } from '../../../../store/auth'

const UserControl: FC = () => {
  const { authUser } = useAuthStore()
  const isAdmin = checkRole(authUser, [ERoles.Admin])
  const { isModal, toggleModal } = useModal()

  return (
    <div className="work-log__control">
      {isAdmin && (
        <Button className='mBtn_outline-green' onClick={toggleModal}>
          <Icon id='add' />
          Добавить
        </Button>
      )}
      <Modal
        visible={isModal}
        title='Форма добавления нового пользователя'
        content={<UserForm toggleModal={toggleModal} />}
        onToggle={toggleModal}
      />
    </div>
  )
}

export default UserControl
