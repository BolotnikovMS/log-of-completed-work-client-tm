import { EUploadFileType } from '../../../../../enums/upload-file-type.enum'

export const typeFileOptions = [
  { value: EUploadFileType.photoPs, label: 'Фото объекта' },
  { value: EUploadFileType.backup, label: 'Бэкап оборудования' },
  { value: EUploadFileType.otherFiles, label: 'Другие файлы' },
]
