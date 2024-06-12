import { Button, Modal } from '../../../../components'

import { Plus } from 'lucide-react'
import { type FC } from 'react'
import { GsmOperatorForm } from '..'
import { ERoles } from '../../../../enums/roles.enum'
import { checkRole } from '../../../../helpers/checkRole.helper'
import { useModal } from '../../../../hooks'
import { useAuthStore } from '../../../../store/auth'

const GsmOperatorControl: FC = () => {
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
        title='Форма добавления gsm оператора' 
        content={<GsmOperatorForm toggleModal={toggleModal} />}
        onToggle={toggleModal} 
      />
    </div>
  )
}

export default GsmOperatorControl