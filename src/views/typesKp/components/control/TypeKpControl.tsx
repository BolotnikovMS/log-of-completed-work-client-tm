import { type FC } from 'react'
import { TypeKpForm } from '..'
import { Button, Modal } from '../../../../components'
import { ERoles } from '../../../../enums/roles.enum'
import { checkRole } from '../../../../helpers/checkRole.helper'
import { useModal } from '../../../../hooks'
import { Add } from '../../../../icons'
import { useAuthStore } from '../../../../store/auth'

const TypeKpControl: FC = () => {
  const { authUser } = useAuthStore()
  const isAdmin = checkRole(authUser, [ERoles.Admin])
  const { isModal, toggleModal } = useModal()

  return (
    <div className="work-log__control">
      {isAdmin && (
        <Button classBtn='btn-bg_green' onClick={() => toggleModal()}>
          <Add className='icon' />
        </Button>
      )}
      <Modal
        visible={isModal}
        title='Форма добавления нового КП'
        content={<TypeKpForm toggleModal={toggleModal} />}
        onToggle={toggleModal}
      />
    </div>
  )
}

export default TypeKpControl
