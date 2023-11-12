export interface IPropsTextarea extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  register: any
  validation?: { [key: string]: unknown }
  error?: string
  name: string
  label: string
  className?: string
}