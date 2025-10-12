export interface ITelemechanicsDevices {
	id: number
	substationId: number
	typeKpId: number
	headControllerId: number
	controllerFirmwareVersion?: string | null
	note?: string | null
}

export interface ITelemechanicsDeviceInfo {
	id: number
	substation: string
	type_kp: string
	head_controller: string
	controllerFirmwareVersion: string | null
	note: string | null
}
