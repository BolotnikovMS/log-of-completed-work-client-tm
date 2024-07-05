import { useEffect, type FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { LoaderLine, Toggle } from '../../../../../components'
import { useChangeStatusAccountMutation } from '../../../../../hooks'
import { IPropChangeStatusAccountFields, IPropsChangeStatusAccountForm } from './changeStatus.interface'

const ChangeStatusAccountForm: FC<IPropsChangeStatusAccountForm> = ({ active, userId }) => {
  const { register, setValue, handleSubmit } = useForm<IPropChangeStatusAccountFields>({
    mode: 'onChange',
  })

  useEffect(() => {
    setValue('active', active)
  }, [active, setValue])

  const { mutateAsync, isPending } = useChangeStatusAccountMutation(userId)
  const submit: SubmitHandler<IPropChangeStatusAccountFields> = data => mutateAsync(data)

  return (
    isPending ?
      <LoaderLine />
      :
      <form onChange={handleSubmit(submit)}>
        <Toggle
          idToggle={userId.toString()}
          defaultChecked={active}
          {...register('active')}
        />
      </form >
  )
}

export default ChangeStatusAccountForm
