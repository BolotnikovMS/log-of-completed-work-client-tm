import { Button, Modal } from '../../../../components'
import React, { useState } from 'react'

import { DistrictForm } from '..'
import { Plus } from 'lucide-react'

export const DistrictControl: React.FC = () => {
  const [isModal, setIsModal] = useState<boolean>(false)
  const onClose = () => setIsModal(false)

  return (
    <div className="work-log__control">
      <Button classBtn='btn-bg_green' onClick={() => setIsModal(true)}>
        <Plus />
      </Button>
      <Modal
        visible={isModal} 
        title='Форма добавления нового района или ГП' 
        content={<DistrictForm setIsModal={setIsModal} />} 
        onClose={onClose} 
      />
    </div>
  )
}
