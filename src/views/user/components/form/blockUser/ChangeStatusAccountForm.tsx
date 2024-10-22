import { useEffect, useState, type FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { LoaderLine, Toggle } from '../../../../../components'
import { useChangeStatusAccountMutation } from '../../../../../hooks'
import { TChangeStatusAccount } from '../../../../../types'

const ChangeStatusAccountForm: FC<TChangeStatusAccount> = ({ active, id }) => {
  const { register, setValue, handleSubmit } = useForm<TChangeStatusAccount>({
    mode: 'onChange',
  })
  const [isActive, setIsActive] = useState<boolean>(active)

  useEffect(() => {
    setValue('active', active)
  }, [active, isActive, setValue])

  const { mutateAsync, isPending } = useChangeStatusAccountMutation()
  const submit: SubmitHandler<TChangeStatusAccount> = data => {
    const answer = confirm('Подтвердтие изменение статуса УЗ.')

    if (!answer) {
      setIsActive(prevActive => !prevActive)

      return
    }

    mutateAsync({ id, active: data.active })
  }

  if (isPending) return <LoaderLine />

  return (
    <form className='flex justify-center' onChange={handleSubmit(submit)}>
      <Toggle
        idToggle={id.toString()}
        className='toggle-success'
        defaultChecked={isActive}
        {...register('active')}
      />
    </form >
  )
}

export default ChangeStatusAccountForm
