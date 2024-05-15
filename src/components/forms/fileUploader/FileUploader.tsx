import { ArrowUpFromLine } from 'lucide-react'
import { type FC } from 'react'
import { Input, ValidationMessage } from '../..'

interface IPropsFileUploader extends React.InputHTMLAttributes<HTMLInputElement>{
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any
  validation?: { [key: string]: unknown }
  errorMessage?: string
	files: FileList | null
}

const FileUploader: FC<IPropsFileUploader> = ({register, errorMessage,  validation, files,  ...attributes  }) => {
	return (
		<>
			<label htmlFor="file" className='label label-upload'>
				<ArrowUpFromLine />
				{files ? files.length === 1 ? files[0].name : `Выбрано файлов: ${files.length}` : 'Загрузить файл(ы)'}
			</label>
			<Input 
				{...register('file', validation)}
				type='file'
				id='file'
				multiple 
				className='none'
				{...attributes}
			/>
			{errorMessage && <ValidationMessage className='error-bottom-23' children={errorMessage} />}
			{files && (
				<>
					{[...files].map((file, i) => (
						<section key={file.name} className='file-info'>
							Информация о {i + 1} файле:
							<p className='text'>Название: <span className="sub-text">{file.name}</span></p>
							<p className='text'>Размер: <span className="sub-text">{(file.size / 1024 / 1024).toFixed(3)} Мб</span></p>
						</section>
					))}
				</>
			)}
		</>
	)
}

export default FileUploader