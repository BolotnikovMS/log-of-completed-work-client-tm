import { useState, type FC } from 'react'
import { SubmitHandler, useController, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import ReactSelect from 'react-select'
import { Button, Error, FileUploader, Group, Icon, Loader, SelectWrapper } from '../../../../../components'
import { useUploadSubstationFile } from '../../../../../hooks/substations/useUploadSubstationFile'
import { IFile, IPropsForm, IPropsMutation } from '../../../../../interfaces'
import { TFileUploadData } from '../../../../../types'
import { typeFileOptions } from './typeFileOptions'

export const UploadSubstationFile: FC<IPropsForm<IFile>> = ({ toggleModal }) => {
  const { id } = useParams()
  const [files, setFiles] = useState<FileList | null>(null)
  const { register, handleSubmit, formState: { errors, isValid }, reset, control } = useForm<TFileUploadData>({
    mode: 'onBlur',
  })
  const { field: { value: typeFileValue, onChange: typeFileOnChange, ...restTypeFileField } } = useController({ name: 'typeFile', control, rules: { required: { value: true, message: 'Поле является обязательным!' } } })
  const { mutateAsync, isError, error, isPending } = useUploadSubstationFile()
  const handleMutation = async ({ data, mutateFn, id }: IPropsMutation<TFileUploadData>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formData: any = new FormData()
    files && [...files]?.forEach(file => formData.append('file[]', file))
    formData.append('typeFile', data.typeFile)
    formData.append('substationId', id!)

    await mutateFn(formData)

    reset()
    toggleModal()
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files)
    }
  }
  const submit: SubmitHandler<TFileUploadData> = data => handleMutation({ data, mutateFn: mutateAsync, id: +id! })

  if (isPending) return <Loader />

  return (
    <div className="work-log__form">
      {(isError) && <Error error={error} />}
      <form className="form !gap-7" onSubmit={handleSubmit(submit)}>
        <Group>
          <SelectWrapper label='Выберете тип файла' errorMessage={errors.typeFile?.message} mandatory>
            <ReactSelect
              classNamePrefix='form__custom-select'
              options={typeFileOptions}
              value={typeFileValue ? typeFileOptions.find(t => t.value === typeFileValue) : null}
              onChange={option => typeFileOnChange(option ? option.value : option)}
              isClearable
              placeholder="Выберите тип..."
              {...restTypeFileField}
            />
          </SelectWrapper>
        </Group>
        <Group>
          <FileUploader
            register={register}
            errorMessage={errors.file?.message}
            onChange={handleFileChange}
            files={files}
          />
        </Group>
        <div className="form__btns">
          <Button disabled={!isValid} type='submit' className='mBtn_outline-green'>
            <Icon id='upload' />
            Добавить
          </Button>
        </div>
      </form>
    </div>
  )
}
