import { IDistrict } from '../../../../interfaces'

export interface IDistrictFields {
  name: string
  shortName: string
}

export interface IPropsDistrictForm {
  district?: IDistrict | null
  isEdited?: boolean | null
  setIsModal: (val: boolean) => void
  setIsEdited?: (val: boolean) => void
}