import { IFile } from '../interfaces'

export type TFileUploadData = {file: File} & Pick<IFile, 'substationId' | 'typeFile'>
