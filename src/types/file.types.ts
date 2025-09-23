import { IFile } from '../interfaces'

export type TFileUploadData = { file: File } & Pick<IFile, 'substationId' | 'typeFile'>

export type TFile = Omit<IFile, 'userId' | 'substationId' | 'typeFile'>

export type TFileUpdName = Pick<IFile, 'clientName'>
