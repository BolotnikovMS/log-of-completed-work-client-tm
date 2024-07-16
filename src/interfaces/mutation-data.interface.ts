export interface IPropsMutation<T> {
	data: T
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	mutateFn: (data: any) => Promise<any>
	id?: number
}