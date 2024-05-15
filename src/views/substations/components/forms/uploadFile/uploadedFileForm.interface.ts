export interface IPropUploadSubstationFile {
	toggleModal: () => void
}

export interface IUploadField {
	typeFile: string
  file: File
	substationId: number
}
