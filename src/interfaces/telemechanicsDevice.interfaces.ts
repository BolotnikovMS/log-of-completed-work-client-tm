export interface ITelemechanicsDevices {
	id: number
	substationId: number
	typeKpId: number
	headControllerId: number
	controllerFirmwareVersion?: string | null
	note?: string | null
}
