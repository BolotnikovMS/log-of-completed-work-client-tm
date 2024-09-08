import { MouseEvent, memo, useCallback, useState, type FC } from 'react'
import { CompletedWorkForm } from '../../..'
import { Button, Dropdown, Modal } from '../../../../../../components'
import { ERoles } from '../../../../../../enums/roles.enum'
import { checkRole } from '../../../../../../helpers'
import { useDeleteCompletedWork, useModal } from '../../../../../../hooks'
import { Delete, Edit, Setting } from '../../../../../../icons'
import { useAuthStore } from '../../../../../../store/auth'
import { IPropsCardControl } from './cardControl.interface'

const CardControl: FC<IPropsCardControl> = memo(({ completedWork }) => {
  const { authUser } = useAuthStore()
  const isAdmin = checkRole(authUser, [ERoles.Admin])
  const { isModal, toggleModal } = useModal()
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const { deleteCompletedWork } = useDeleteCompletedWork()
  const handleDelete = useCallback((id: number, e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>): void | null => {
    e.stopPropagation()
    const answer = confirm('Подтвердите удаление записи.')

    if (!answer) return null

    return deleteCompletedWork.mutate(id)
  }, [deleteCompletedWork])
  const handleEdit = useCallback((e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.stopPropagation()
    setIsEdited(!isEdited)
    toggleModal()
  }, [isEdited, toggleModal])

  return (
    <>
      {checkRole(authUser, [ERoles.Admin, ERoles.Moderator], true, completedWork) && (
        <Dropdown
          children={
            <Setting className='icon icon__setting ' />
          }
          menuItems={[
            checkRole(authUser, [ERoles.Admin, ERoles.Moderator], true, completedWork) && (
              <Button className='!justify-start' onClick={(e) => { handleEdit(e) }}>
                <Edit className='icon' />
                Редактировать
              </Button>
            ),
            isAdmin && (
              <Button className='!justify-start btn-error' onClick={(e) => { handleDelete(completedWork.id, e) }}>
                <Delete className='icon' />
                Удалить
              </Button>
            )
          ]}
        />
      )}
      <Modal
        visible={isModal}
        title='Редактирование записи'
        onToggle={(e) => { e.stopPropagation(), toggleModal(), setIsEdited(false) }}
        content={
          <CompletedWorkForm
            completedWork={completedWork}
            isEdited={isEdited}
            setIsEdited={setIsEdited} toggleModal={toggleModal}
          />
        }
      />
    </>
  )
})

export default CardControl