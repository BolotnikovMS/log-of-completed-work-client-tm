import { useMutation } from '@tanstack/react-query'
import { ArrowUpFromLine } from 'lucide-react'
import { type FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import ReactSelect from 'react-select'
import { toast } from 'react-toastify'
import { Group, Input, SelectWrapper } from '../../../../../components'
import { errorHandler } from '../../../../../helpers'
import { UploadService } from '../../../../../services/upload-file/upload-file.service'

interface IPropUploadSubstationFile {
	toggleModal: () => void
}

interface IUploadField {
  file: File[]
}

export const UploadSubstationFile: FC<IPropUploadSubstationFile> = ({ toggleModal }) => {
	// const [progress, setProgress] = useState<number>(0)
	const { id } = useParams()
	const { register, handleSubmit, formState: { errors }, reset } = useForm<IUploadField>({
		mode: 'onBlur',
	})
	const { mutateAsync, isError: isErrorMutate, error: errorMutate } = useMutation({
		mutationFn: (data) => UploadService.upload(data),
		onSuccess: () => {
			toast.success('Фото успешно загружено!')
			reset()
		},
		onError: async (errors) => {
			toast.error(errorHandler(errors))
			reset()
		}
	})

	// 1
	// const onSubmit = async (e: ChangeEvent<HTMLInputElement>) => {
	// 	const files: File[] = e.target.files ? Array.from(e.target.files) : []
  //   const formData = new FormData()
  //   for (let i = 0; i < files.length; i++) {
  //     formData.append('file[]', files[i]);
  //   }
  //   formData.append('typeFile', 'photo_ps')
  //   formData.append('substationId', id!)
	// 	console.log('formData: ', formData.getAll('file'));

  //   try {
	// 		UploadService.upload(formData)
  //     // setProgress(0)
  //   } catch (error) {
  //     console.error(error)
	// 		toast.error(error.message)
  //   }
  // }

	// 2
	const submit: SubmitHandler<IUploadField> = data => {
		// console.log('data: ', data
		// const formData = new FormData()

    // for (let i = 0; i < data.file.length; i++) {
    //   formData.append('file[]', data.file[i])
    // }
	
		// formData.append('typeFile', 'photo_ps')
    // formData.append('substationId', id!)

		// mutateAsync(formData)
	}

	return (
		<form className="form form-col" onSubmit={handleSubmit(submit)}>
			<div className="form__content form__content-w-55 form__content-mt">
				<Group className='group-col group-str'>
					<SelectWrapper label='Выберете тип файла'>
						<ReactSelect
							classNamePrefix='form__custom-select'
							placeholder="Выберите тип..."
						/>
					</SelectWrapper>
				</Group>
				<Group className='group-aic'>
					<label htmlFor="file" className='label label-upload'>
						<ArrowUpFromLine />
						Загрузить фото
					</label>
					<Input type='file' multiple id='file' className='' {...register('file')}  />
					{errors.file && <span>{errors.file.message}</span>}
				</Group>
			</div>
		</form>
	)
}
