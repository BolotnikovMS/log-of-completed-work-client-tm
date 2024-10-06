import { memo, useCallback, useState, type FC } from 'react'
import { Button, Dropdown, Icon, Modal } from '../../../../../../components'
import { ERoles } from '../../../../../../enums/roles.enum'
import { checkRole } from '../../../../../../helpers'
import { useDeleteChannel, useModal } from '../../../../../../hooks'
import { IChannel } from '../../../../../../interfaces'
import { useAuthStore } from '../../../../../../store/auth'
import { ChannelForm } from '../../../../../channel/components'

interface IPropsChannelControlMenu {
  channel: IChannel
}

const ChannelControlMenu: FC<IPropsChannelControlMenu> = memo(({ channel }) => {
  const { authUser } = useAuthStore()
  const isAdmin = checkRole(authUser, [ERoles.Admin])
  const isAdminOrModerator = checkRole(authUser, [ERoles.Moderator, ERoles.Admin])
  const { isModal, toggleModal } = useModal()
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const { deleteChannel } = useDeleteChannel()
  const handleDelete = useCallback((id: number) => {
    const answer = confirm('Подтвердите удаление записи.')

    if (!answer) return null

    return deleteChannel.mutate(id)
  }, [deleteChannel])
  const handleEdit = useCallback(() => {
    setIsEdited(!isEdited)
    toggleModal()
  }, [isEdited, toggleModal])

  return (
    <>
      {checkRole(authUser, [ERoles.Admin, ERoles.Moderator]) && (
        <>
          <Dropdown
            children={<Icon id='setting' />}
            menuItems={[
              isAdminOrModerator && (
                <Button className='!justify-start' onClick={handleEdit}>
                  <Icon id='edit' />
                  Редактировать
                </Button>
              ),
              isAdmin && (
                <Button className='btn-error !justify-start' onClick={() => handleDelete(channel.id)}>
                  <Icon id='delete' />
                  Удалить
                </Button>
              )
            ]}
          />
          <Modal
            visible={isModal}
            title='Редактирование записи'
            onToggle={() => { toggleModal(), setIsEdited(false) }}
            content={<ChannelForm data={channel} isEdited={isEdited} setIsEdited={setIsEdited} toggleModal={toggleModal} />}
          />
        </>
      )}
    </>
  )
})

export default ChannelControlMenu
