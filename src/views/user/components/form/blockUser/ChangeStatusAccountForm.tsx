import { type FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { LoaderLine, Toggle } from '../../../../../components'
import { useChangeStatusAccountMutation } from '../../../../../hooks'
import styles from './change-status.module.scss'
import { IPropChangeStatusAccountFields, IPropsChangeStatusAccountForm } from './changeStatus.interface'

const ChangeStatusAccountForm: FC<IPropsChangeStatusAccountForm> = ({ active, userId }) => {
  const { register, setValue, handleSubmit } = useForm<IPropChangeStatusAccountFields>({
    mode: 'onChange',
  })
  const [isActive, setIsActive] = useState(active)

  useEffect(() => {
    setValue('active', active)
  }, [active, isActive, setValue])

  const { mutateAsync, isPending } = useChangeStatusAccountMutation(userId)
  const submit: SubmitHandler<IPropChangeStatusAccountFields> = data => {
    const answer = confirm('Подтвердтие изменение статуса УЗ.')

    if (!answer) {
      setIsActive(prevActive => !prevActive)

      return
    }

    mutateAsync(data)
  }

  if (isPending) return <LoaderLine />

  return (
    <form className={styles.changeStatusForm} onChange={handleSubmit(submit)}>
      <Toggle
        idToggle={userId.toString()}
        defaultChecked={isActive}
        {...register('active')}
      />
    </form >
  )
}

export default ChangeStatusAccountForm
