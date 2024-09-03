import { type FC } from 'react'
import { SubstationFilters, SubstationForm } from '../..'
import { Button, Modal } from '../../../../../components'
import { ERoles } from '../../../../../enums/roles.enum'
import { checkRole } from '../../../../../helpers/checkRole.helper'
import { useModal } from '../../../../../hooks'
import { Add } from '../../../../../icons'
import { useAuthStore } from '../../../../../store/auth'

const SubstationControl: FC = () => {
  const { authUser } = useAuthStore()
  const isAdmin = checkRole(authUser, [ERoles.Admin])
  const { isModal, toggleModal } = useModal()

  return (
    <div className="work-log__control">
      <div className="control__wrapper">
        {isAdmin && (
          <Button className='mBtn_outline-green' onClick={() => toggleModal()}>
            <Add className='icon' />
            Добавить
          </Button>
        )}
        <Modal
          visible={isModal}
          title='Форма добавления подстанций'
          content={<SubstationForm toggleModal={toggleModal} />}
          onToggle={toggleModal}
        />
        <SubstationFilters />
      </div>
    </div>
  )
}

export default SubstationControl
