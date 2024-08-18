import { type FC } from 'react'
import { Button, ChangePasswordForm, Modal } from '../../../../components'
import { useModal } from '../../../../hooks'
import { Key } from '../../../../icons'
import { useAuthStore } from '../../../../store/auth'

const ProfileControl: FC = () => {
  const { authUser } = useAuthStore()
  const { isModal, toggleModal } = useModal()

  return (
    <div className='work-log__control'>
      {authUser && (
        <Button className='mBtn_primary' onClick={() => toggleModal()}>
          <Key className='icon' />
          Сменить пароль
        </Button>
      )}
      <Modal
        visible={isModal}
        title='Форма смены пароля'
        content={<ChangePasswordForm toggleModal={toggleModal} />}
        onToggle={toggleModal}
      />
    </div>
  )
}

export default ProfileControl
