import { Button, Modal } from '../../../../components'

import { DistrictForm } from '..'
import { Plus } from 'lucide-react'
import React from 'react'
import { useModal } from '../../../../hooks'

export const DistrictControl: React.FC = () => {
  const { isModal, toggleModal } = useModal()

  return (
    <div className="work-log__control">
      <Button classBtn='btn-bg_green' onClick={() => toggleModal()}>
        <Plus />
      </Button>
      <Modal
        visible={isModal} 
        title='Форма добавления нового района или ГП' 
        content={<DistrictForm toggleModal={toggleModal} />}
        onToggle={toggleModal} 
      />
    </div>
  )
}
