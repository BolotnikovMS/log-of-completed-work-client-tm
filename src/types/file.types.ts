import { IFile } from '../interfaces'

export type TFileUploadData = {file: File} & Pick<IFile, 'substationId' | 'typeFile'>

export type TFileList = Omit<IFile, 'userId' | 'substationId' | 'typeFile'>
