import { type FC } from 'react'
import { ChannelTypeForm } from '..'
import { Button, Icon, Modal } from '../../../../components'
import { ERoles } from '../../../../enums/roles.enum'
import { checkRole } from '../../../../helpers/checkRole.helper'
import { useModal } from '../../../../hooks'
import { useAuthStore } from '../../../../store/auth'

const ChannelTypeControl: FC = () => {
  const { authUser } = useAuthStore()
  const isAdmin = checkRole(authUser, [ERoles.Admin])
  const { isModal, toggleModal } = useModal()

  return (
    <div className="work-log__control">
      {isAdmin && (
        <Button className='mBtn_outline-green' onClick={() => toggleModal()}>
          <Icon id='add' />
          Добавить
        </Button>
      )}
      <Modal
        visible={isModal}
        title='Форма добавления нового типа канала'
        content={<ChannelTypeForm toggleModal={toggleModal} />}
        onToggle={toggleModal}
      />
    </div>
  )
}

export default ChannelTypeControl
