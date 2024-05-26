import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, type FC } from 'react'
import { SubmitHandler, useController, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import ReactSelect from 'react-select'
import { toast } from 'react-toastify'
import { Button, Error, FileUploader, Group, SelectWrapper } from '../../../../../components'
import { EUploadFileType } from '../../../../../enums/upload-file-type.enum'
import { errorHandler } from '../../../../../helpers'
import { FileService } from '../../../../../services/file/file.service'
import { TNewFileUpload } from '../../../../../services/file/file.type'
import { IPropUploadSubstationFile, IUploadField } from './uploadedFileForm.interface'

const typeFileOptions = [
	{ value: EUploadFileType.photoPs, label: 'Фото объекта' },
	{ value: EUploadFileType.backup, label: 'Бэкап оборудования' },
]

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
			location.reload()
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
			<form className="form form-col" onSubmit={handleSubmit(submit)}>
				<div className="form__content form__content-w-55 form__content-mt">
					<Group className='group-col group-str'>
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
					<Group className='group-col group-str'>
						<FileUploader
							register={register}
							errorMessage={errors.file?.message}
							onChange={handleFileChange}
							files={files}
						/>
					</Group>
				</div>
				<div className="form__btns">
					<Button disabled={!isValid} type='submit' classBtn='btn-bg_green'>
						Добавить
					</Button>
				</div>
			</form>
		</div>
	)
}
