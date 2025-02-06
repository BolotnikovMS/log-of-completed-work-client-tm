import { SVGProps } from 'react'
import { TIconName } from '../../types/icons.type'

export interface IPropsIcon extends SVGProps<SVGSVGElement> {
  id: TIconName
  className?: string
}
