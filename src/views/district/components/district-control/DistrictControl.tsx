import { type FC } from 'react'
import { DistrictForm } from '..'
import { Button, Modal } from '../../../../components'
import { ERoles } from '../../../../enums/roles.enum'
import { checkRole } from '../../../../helpers/checkRole.helper'
import { useModal } from '../../../../hooks'
import { Add } from '../../../../icons'
import { useAuthStore } from '../../../../store/auth'

const DistrictControl: FC = () => {
  const { authUser } = useAuthStore()
  const isAdmin = checkRole(authUser, [ERoles.Admin])
  const { isModal, toggleModal } = useModal()

  return (
    <div className="work-log__control">
      {isAdmin && (
        <Button className='mBtn_outline-green' onClick={toggleModal}>
          <Add className='icon' />
        </Button>
      )}
      <Modal
        visible={isModal}
        title='Форма добавления нового района или ГП'
        content={<DistrictForm toggleModal={toggleModal} />}
        onToggle={toggleModal}
      />
    </div>
  )
}

export default DistrictControl
