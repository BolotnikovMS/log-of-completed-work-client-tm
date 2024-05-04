import { Button, Modal } from '../../../../components'

import { Plus } from 'lucide-react'
import { type FC } from 'react'
import { SubstationFilters, SubstationForm } from '..'
import { checkRole, ERoles } from '../../../../helpers/checkRole.helper'
import { useModal } from '../../../../hooks'
import { useAuthStore } from '../../../../store/auth'

const SubstationControl: FC = () => {
	const { authUser } = useAuthStore()
  const { isModal, toggleModal } = useModal()

  return (
    <div className="work-log__control">
			<div className="control__wrapper">
				{
					checkRole(authUser, [ERoles.Admin, ERoles.Moderator]) && (
						<Button classBtn='btn-bg_green' onClick={() => toggleModal()}>
							<Plus />
						</Button>
					)
				}
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