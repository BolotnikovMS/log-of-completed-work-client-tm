import { FC, useCallback } from 'react'
import { Button, Icon, Modal } from '../../../../../../components'
import { useModal } from '../../../../../../hooks'
import { IChannel } from '../../../../../../interfaces'

const ChannelInfoNote: FC<{ channel: IChannel }> = ({ channel }) => {
  const { isModal, toggleModal } = useModal()
  const { note } = channel
  const handleToggleModal = useCallback(() => {
    toggleModal()
  }, [toggleModal])

  return (
    <>
      <Button className='col-span-2' onClick={handleToggleModal}>
        <Icon id='view' />
        Показать примечания
      </Button>
      <Modal
        visible={isModal}
        title='Примечания к записи'
        onToggle={handleToggleModal}
        content={
          <p className='text-content text-balance'>{note}</p>
        }
      />
    </>
  )
}

export default ChannelInfoNote
