import { Button, Modal } from '../../../../components'

import { ChannelTypeForm } from '..'
import { Plus } from 'lucide-react'
import React from 'react'
import { useModal } from '../../../../hooks'

export const ChannelTypeControl: React.FC = () => {
  const { isModal, toggleModal } = useModal()

  return (
    <div className="work-log__control">
      <Button classBtn='btn-bg_green' onClick={() => toggleModal()}>
        <Plus />
      </Button>
      <Modal
        visible={isModal} 
        title='Форма добавления нового канала' 
        content={<ChannelTypeForm toggleModal={toggleModal} />}
        onToggle={toggleModal} 
      />
    </div>
  )
}
