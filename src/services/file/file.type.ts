import { IFile } from '../../interfaces'

export type TNewFileUpload = FileList | Pick<IFile, 'substationId'>
