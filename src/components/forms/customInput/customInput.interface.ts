import { IPropsInput } from '../../input/input.interface'

export interface IPropsCustomInput extends IPropsInput {
  // register: UseFormRegister<FieldValues>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any
  validation?: { [key: string]: unknown }
  error?: string
  name: string
  label: string
  classLabel?: string
}