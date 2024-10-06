import { memo, useCallback, useState, type FC } from 'react'
import { ChannelCategoryForm } from '../../..'
import { Button, Dropdown, Icon, Modal } from '../../../../../../components'
import { ERoles } from '../../../../../../enums/roles.enum'
import { checkRole } from '../../../../../../helpers'
import { useDeleteChannelCategory, useModal } from '../../../../../../hooks'
import { useAuthStore } from '../../../../../../store/auth'
import { IPropsCardControl } from './cardControl.interface'

const CardControl: FC<IPropsCardControl> = memo(({ channelCategory }) => {
  const { authUser } = useAuthStore()
  const isAdmin = checkRole(authUser, [ERoles.Admin])
  const isAdminOrModerator = checkRole(authUser, [ERoles.Moderator, ERoles.Admin])
  const { isModal, toggleModal } = useModal()
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const { deleteChannelCategory } = useDeleteChannelCategory()
  const handleDelete = useCallback((id: number): void | null => {
    const answer = confirm('Подтвердите удаление записи.')

    if (!answer) return null

    return deleteChannelCategory.mutate(id)
  }, [deleteChannelCategory])
  const handleEdit = useCallback(() => {
    setIsEdited(!isEdited)
    toggleModal()
  }, [isEdited, toggleModal])

  return (
    <>
      {checkRole(authUser, [ERoles.Admin, ERoles.Moderator], true, channelCategory) && (
        <Dropdown
          children={
            <Icon id='setting' className='icon__setting' />
          }
          menuItems={[
            isAdminOrModerator && (
              <Button className='!justify-start' onClick={() => { handleEdit() }}>
                <Icon id='edit' />
                Редактировать
              </Button>
            ),
            isAdmin && (
              <Button className='!justify-start btn-error' onClick={() => { handleDelete(channelCategory.id) }}>
                <Icon id='delete' />
                Удалить
              </Button>
            )
          ]}
        />
      )}
      <Modal
        visible={isModal}
        title='Редактирование записи'
        onToggle={() => { toggleModal(), setIsEdited(false) }}
        content={
          <ChannelCategoryForm
            channelCategory={channelCategory}
            isEdited={isEdited}
            setIsEdited={setIsEdited}
            toggleModal={toggleModal}
          />
        }
      />
    </>
  )
})

export default CardControl