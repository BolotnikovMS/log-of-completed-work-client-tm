import { IDistrict } from '../../../../interfaces'

export interface IDistrictFields {
  name: string
  shortName: string
}

export interface IPropsDistrictForm {
  district?: IDistrict | null
  isEdited?: boolean | null
  toggleModal: () => void
  setIsEdited?: (val: boolean) => void
}