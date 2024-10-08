import * as yup from 'yup'
import { numberCheck, text240 } from '../../../../../validations/rules'

export const validationSchema = yup.object().shape({
  districtId: numberCheck,
  typeKpId: numberCheck,
  headControllerId: numberCheck,
  name: text240,
  voltageClassesId: numberCheck,
  rdu: yup
    .boolean()
    .default(false),
  active: yup
    .boolean()
    .default(true)
})
