export interface ISubstation {
  id: number
  active: boolean
  name: string
  fullNameSubstation: string
  slug: string
  rdu: boolean
  districtId: number
  voltageClassesId: number
  typeKpId: number
  headControllerId: number
  mainChannelId: number
  backupChannelId: number | null
  additionalChannelId: number | null
  gsmId: number | null
  mainChannelIp: string | null
  backupChannelIp?: string | null
}