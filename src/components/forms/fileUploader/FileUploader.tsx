import { type FC } from 'react'
import { Icon, ValidationMessage } from '../..'
import { IPropsFileUploader } from './fileUpload.interface'

const FileUploader: FC<IPropsFileUploader> = ({ register, errorMessage, validation, files, ...attributes }) => {
  return (
    <>
      <label htmlFor="file" className='label label-upload !rounded-xl'>
        <Icon id='file-add' />
        <span className='label__text'>
          {files ? files.length === 1 ? files[0].name : `Выбрано файлов: ${files.length}` : 'Загрузить файл(ы)'}
        </span>
      </label>
      <input
        {...register('file', validation)}
        id='file'
        type="file"
        className="hidden invisible input w-full"
        multiple
        {...attributes}
      />

      {errorMessage && <ValidationMessage className='error-bottom-23' children={errorMessage} />}
      {files && (
        <>
          {[...files].map((file, i) => (
            <section key={file.name}>
              <span className='text-title'>Информация о {i + 1} файле:</span>
              <p className='text-content !font-bold'>Название: <span className="text-content">{file.name}</span></p>
              <p className='text-content !font-bold'>Размер: <span className="text-content">{(file.size / 1024 / 1024).toFixed(3)} Мб</span></p>
            </section>
          ))}
        </>
      )}
    </>
  )
}

export default FileUploader
