export interface IChannel {
  id: number
  substationId: number
  channelCategoryId: number
  channelTypeId: number
  channelEquipmentId?: number | null
  gsmId?: number | null
  ipAddress?: string | null
  note?: string | null
  channel_category?: string | null
  channel_type?: string | null
  substation?: string | null
  channel_equipment?: string | null
  gsm_operator?: string | null
}
