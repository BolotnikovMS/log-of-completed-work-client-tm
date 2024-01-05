import { IPropsInput } from '../../input/input.interface'

export interface IPropsCustomInput extends IPropsInput {
  // register: UseFormRegister<FieldValues>
  register: unknown
  validation?: { [key: string]: unknown }
  error?: string
  name: string
  label: string
  classLabel?: string
}