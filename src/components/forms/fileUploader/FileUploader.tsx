import { type FC } from 'react'
import { Icon, ValidationMessage } from '../..'
import { IPropsFileUploader } from './fileUpload.interface'

const FileUploader: FC<IPropsFileUploader> = ({ register, errorMessage, validation, files, ...attributes }) => {
	return (
		<>
			<label htmlFor="file" className='label label-upload !rounded-xl'>
				<Icon id='file-add' />
				<span className='label__text'>
					{files ? files.length === 1 ? `Выбран файл: ${files[0].name}` : `Выбрано файлов: ${files.length}` : 'Загрузить файл(ы)'}
				</span>
			</label>
			<input
				{...register('file', validation)}
				id='file'
				type="file"
				className="hidden invisible input w-full"
				{...attributes}
			/>

			{errorMessage && <ValidationMessage className='error-bottom-23' children={errorMessage} />}
			{files && (
				<>
					{[...files].map((file, i) => (
						<section key={file.name} className='flex items-center gap-4'>
							<div>
								<Icon id='file' className='!w-10 !h-10' />
							</div>
							<div>
								<span className='text-title'>Информация о {files.length > 1 && i + 1} файле:</span>
								<p className='text-content !font-bold'>Название: <span className="text-content">{file.name}</span></p>
								<p className='text-content !font-bold'>Размер: <span className="text-content">{(file.size / 1024 / 1024).toFixed(3)} Мб</span></p>
							</div>
						</section>
					))}
				</>
			)}
		</>
	)
}

export default FileUploader
