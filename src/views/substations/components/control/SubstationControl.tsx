import { Button, Modal } from '../../../../components'

import { Plus } from 'lucide-react'
import { type FC } from 'react'
import { SubstationForm } from '..'
import { useModal } from '../../../../hooks'

const SubstationControl: FC = () => {
  const { isModal, toggleModal } = useModal()

  return (
    <div className="work-log__control">
      <Button classBtn='btn-bg_green' onClick={() => toggleModal()}>
        <Plus />
      </Button>
      <Modal
        visible={isModal} 
        title='Форма добавления подстанций' 
        content={<SubstationForm toggleModal={toggleModal} />}
        onToggle={toggleModal} 
      />
    </div>
  )
}

export default SubstationControl