import { Button, Modal } from '..'
import React, { useState } from 'react'

import { Plus } from 'lucide-react'

interface IPropsControlPanel {
  titleModal: string
  formModal: React.ReactNode
}

export const ControlPanel: React.FC<IPropsControlPanel> = ({ titleModal, formModal }) => {
  const [isModal, setIsModal] = useState<boolean>(false)
  const onClose = () => setIsModal(false)

  return (
    <div className="work-log__control">
      <Button classBtn='btn-bg_green' onClick={() => setIsModal(true)}>
        <Plus />
      </Button>
      <Modal
        visible={isModal}
        title={titleModal}
        content={formModal}
        onClose={onClose} 
      />
    </div>
  )
}
