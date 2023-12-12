import { Button, Modal } from '../../../../components'
import React, { useState } from 'react'

import { Plus } from 'lucide-react'
import { VoltageClassForm } from '..'

export const VoltageControl: React.FC = () => {
  const [isModal, setIsModal] = useState<boolean>(false)
  const onClose = () => setIsModal(false)

  return (
    <div className="work-log__control">
      <Button classBtn='btn-bg_green' onClick={() => setIsModal(true)}>
        <Plus />
      </Button>
      <Modal
        visible={isModal} 
        title='Форма добавления нового класса напряжения' 
        content={<VoltageClassForm setIsModal={setIsModal} />} 
        onClose={onClose} 
      />
    </div>
  )
}
