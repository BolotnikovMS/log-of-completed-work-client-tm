import { type FC } from 'react'
import { HeadControllerForm } from '..'
import { Button, Modal } from '../../../../components'
import { ERoles } from '../../../../enums/roles.enum'
import { checkRole } from '../../../../helpers/checkRole.helper'
import { useModal } from '../../../../hooks'
import { Add } from '../../../../icons'
import { useAuthStore } from '../../../../store/auth'

const HeadControllerControl: FC = () => {
  const { authUser } = useAuthStore()
  const isAdmin = checkRole(authUser, [ERoles.Admin])
  const { isModal, toggleModal } = useModal()

  return (
    <div className="work-log__control">
      {isAdmin && (
        <Button className='mBtn_outline-green' onClick={() => toggleModal()}>
          <Add className='icon' />
        </Button>
      )}
      <Modal
        visible={isModal}
        title='Форма добавления нового контроллера'
        content={<HeadControllerForm toggleModal={toggleModal} />}
        onToggle={toggleModal}
      />
    </div>
  )
}

export default HeadControllerControl
