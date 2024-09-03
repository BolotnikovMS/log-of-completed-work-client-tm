import { type FC } from 'react'
import { DistrictForm } from '..'
import { Button, Modal } from '../../../../components'
import { ERoles } from '../../../../enums/roles.enum'
import { checkRole } from '../../../../helpers/checkRole.helper'
import { useModal } from '../../../../hooks'
import { Add } from '../../../../icons'
import { useAuthStore } from '../../../../store/auth'
import DistrictFilters from '../filters/DistrictFilters'

const DistrictControl: FC = () => {
  const { authUser } = useAuthStore()
  const isAdmin = checkRole(authUser, [ERoles.Admin])
  const { isModal, toggleModal } = useModal()

  return (
    <div className="work-log__control">
      <div className="control__wrapper !justify-start">
        {isAdmin && (
          <Button className='mBtn_outline-green' onClick={toggleModal}>
            <Add className='icon' />
            Добавить
          </Button>
        )}
        <Modal
          visible={isModal}
          title='Форма добавления нового района или ГП'
          content={<DistrictForm toggleModal={toggleModal} />}
          onToggle={toggleModal}
        />
        <DistrictFilters />
      </div>
    </div>
  )
}

export default DistrictControl
