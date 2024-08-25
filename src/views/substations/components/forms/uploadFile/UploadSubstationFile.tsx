import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, type FC } from 'react'
import { SubmitHandler, useController, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import ReactSelect from 'react-select'
import { toast } from 'react-toastify'
import { Button, Error, FileUploader, Group, SelectWrapper } from '../../../../../components'
import { errorHandler } from '../../../../../helpers'
import { Upload } from '../../../../../icons'
import { FileService } from '../../../../../services/file/file.service'
import { TNewFileUpload } from '../../../../../services/file/file.type'
import { typeFileOptions } from './typeFileOptions'
import { IPropUploadSubstationFile, IUploadField } from './uploadedFileForm.interface'

export const UploadSubstationFile: FC<IPropUploadSubstationFile> = ({ toggleModal }) => {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const [files, setFiles] = useState<FileList | null>(null)
  const { register, handleSubmit, formState: { errors, isValid }, reset, control } = useForm<IUploadField>({
    mode: 'onBlur',
  })
  const { field: { value: typeFileValue, onChange: typeFileOnChange, ...restTypeFileField } } = useController({ name: 'typeFile', control, rules: { required: { value: true, message: 'Поле является обязательным!' } } })
  const { mutateAsync, isError: isErrorMutate, error: errorMutate } = useMutation({
    mutationFn: (data: TNewFileUpload) => FileService.upload(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['substation'] })

      toast.success('Файл успешно загружен!')
      reset()
      toggleModal()
    },
    onError: async (errors) => {
      toast.error(errorHandler(errors))
      reset()
    }
  })
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files)
    }
  }

  const submit: SubmitHandler<IUploadField> = data => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formData: any = new FormData()
    files && [...files]?.forEach(file => formData.append('file[]', file))
    formData.append('typeFile', data.typeFile)
    formData.append('substationId', id!)

    return mutateAsync(formData)
  }

  return (
    <div className="work-log__form">
      {(isErrorMutate) && <Error error={errorMutate} />}
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
            <Upload className='icon' />
            Добавить
          </Button>
        </div>
      </form>
    </div>
  )
}
