import { Button, Modal } from '../../../../components'

import { Plus } from 'lucide-react'
import { type FC } from 'react'
import { TypeKpForm } from '..'
import { useModal } from '../../../../hooks'

const TypeKpControl: FC = () => {
  const { isModal, toggleModal } = useModal()

  return (
    <div className="work-log__control">
      <Button classBtn='btn-bg_green' onClick={() => toggleModal()}>
        <Plus />
      </Button>
      <Modal
        visible={isModal} 
        title='Форма добавления нового КП' 
        content={<TypeKpForm toggleModal={toggleModal} />} 
        onToggle={toggleModal} 
      />
    </div>
  )
}

export default TypeKpControl