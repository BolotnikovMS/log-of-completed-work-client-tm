
export interface IPropsBasicTable {
	data: unknown[]
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	columns: any[]
	search?: boolean
	size?: number
	title?: string
}