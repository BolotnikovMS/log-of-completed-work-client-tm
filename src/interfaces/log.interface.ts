export interface Ilog {
	id: number
	user: string | null
	url: string | null
	method: string | null
	statusCode: number | null
	action: string
	errorType: string | null
	errorMessage: string | null
	model: string | null
	data: string
	changes: string | null
	ipAddress: string | null
	createdAt: Date
}
