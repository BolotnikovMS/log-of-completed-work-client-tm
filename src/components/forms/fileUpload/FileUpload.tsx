import { type FC } from 'react'
import { Icon, ValidationMessage } from '../..'
import { IPropsFileUpload } from './fileUpload.interface'

const FileUpload: FC<IPropsFileUpload> = ({ register, errorMessage, validation, file, ...attributes }) => {
	return (
		<>
			<label htmlFor="file" className='label label-upload !rounded-xl'>
				<Icon id='file-add' />
				<span className='label__text'>
					{file ? `Выбран файл: ${file.name}` : 'Загрузить файл'}
				</span>
			</label>
			<input
				{...register('file', validation)}
				id='file'
				type="file"
				className="hidden invisible input w-full"
				{...attributes}
			/>
			{errorMessage && <ValidationMessage className='error-bottom-23 !relative' children={errorMessage} />}
		</>
	)
}

export default FileUpload
