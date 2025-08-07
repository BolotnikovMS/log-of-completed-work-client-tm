import { useState, type FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Error, FileUploader, Group, Icon, Loader } from '../../../../../components'
import { useUploadCSVSubstationKey } from '../../../../../hooks'
import { IPropsMutation } from '../../../../../interfaces'

const UploadCSVSubstationKey: FC = () => {
	const [file, setFile] = useState<FileList | null>(null)
	const { register, handleSubmit, formState: { errors }, reset } = useForm<{ csvFile: File }>({
		mode: 'all'
	})
	const { mutateAsync, isError, error, isPending } = useUploadCSVSubstationKey()
	const handleMutation = async ({ mutateFn }: IPropsMutation<{ csvFile: File }>) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const formData: any = new FormData()

		file && [...file]?.forEach(file => formData.append('csvFile', file))

		await mutateFn(formData)

		reset()
	}
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setFile(e.target.files)
		}
	}
	const submit: SubmitHandler<{ csvFile: File }> = data => handleMutation({ data, mutateFn: mutateAsync })

	if (isPending) return <Loader />

	return (
		<div className="flex flex-col items-center justify-center p-4">
			{(isError) && <Error error={error} />}
			<form className='form w-[30vw]' onSubmit={handleSubmit(submit)}>
				<Group>
					<FileUploader
						register={register}
						errorMessage={errors.csvFile?.message}
						onChange={handleFileChange}
						files={file}
						accept='.csv, text/csv, application/csv'
					/>
				</Group>
				<Group className='items-center mt-5'>
					<Button type='submit' className='mBtn_outline-green'>
						<Icon id='upload' />
						Загрузить файл
					</Button>
				</Group>
			</form>
		</div>
	)
}

export default UploadCSVSubstationKey
