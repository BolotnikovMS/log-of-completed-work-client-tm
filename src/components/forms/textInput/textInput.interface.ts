import { IPropsInput } from '../../input/input.interface'

export interface IPropsTextInput extends IPropsInput {
  // register: UseFormRegister<FieldValues>
  register: any
  validation?: { [key: string]: unknown }
  error?: string
  name: string
  label: string
}