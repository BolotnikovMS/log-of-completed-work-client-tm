import { Button, Modal } from '../../../../components'

import { GsmOperatorForm } from '..'
import { Plus } from 'lucide-react'
import React from 'react'
import { useModal } from '../../../../hooks'

export const GsmOperatorControl: React.FC = () => {
  const { isModal, toggleModal } = useModal()

  return (
    <div className="work-log__control">
      <Button classBtn='btn-bg_green' onClick={() => toggleModal()}>
        <Plus />
      </Button>
      <Modal
        visible={isModal} 
        title='Форма добавления gsm оператора' 
        content={<GsmOperatorForm toggleModal={toggleModal} />}
        onToggle={toggleModal} 
      />
    </div>
  )

}
