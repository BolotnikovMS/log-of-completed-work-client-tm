import { Button, Modal } from '../../../../components'

import { Plus } from 'lucide-react'
import { type FC } from 'react'
import { VoltageClassForm } from '..'
import { checkRole } from '../../../../helpers/checkRole.helper'
import { useModal } from '../../../../hooks'
import { useAuthStore } from '../../../../store/auth'
import { ERoles } from '../../../../enums/roles.enum'

const VoltageControl: FC = () => {
	const { authUser } = useAuthStore()
  const { isModal, toggleModal } = useModal()

  return (
    <div className="work-log__control">
			{
				checkRole(authUser, [ERoles.Admin, ERoles.Moderator]) && (
					<Button classBtn='btn-bg_green' onClick={() => toggleModal()}>
						<Plus />
					</Button>
				)
			}
      <Modal
        visible={isModal} 
        title='Форма добавления нового класса напряжения' 
        content={<VoltageClassForm toggleModal={toggleModal} />} 
        onToggle={toggleModal} 
      />
    </div>
  )
}

export default VoltageControl