export interface IPropsFileUpload extends React.InputHTMLAttributes<HTMLInputElement> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	register: any
	validation?: { [key: string]: unknown }
	errorMessage?: string
	file: File | null
}
