import { Button, Modal } from '../../../../components'

import { Plus } from 'lucide-react'
import React from 'react'
import { VoltageClassForm } from '..'
import { useModal } from '../../../../hooks'

export const VoltageControl: React.FC = () => {
  const { isModal, toggleModal } = useModal()

  return (
    <div className="work-log__control">
      <Button classBtn='btn-bg_green' onClick={() => toggleModal()}>
        <Plus />
      </Button>
      <Modal
        visible={isModal} 
        title='Форма добавления нового класса напряжения' 
        content={<VoltageClassForm toggleModal={toggleModal} />} 
        onToggle={toggleModal} 
      />
    </div>
  )
}
