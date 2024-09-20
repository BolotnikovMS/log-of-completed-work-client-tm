import * as yup from 'yup'
import { numberCheck } from '../../../../../validations/rules'

export const validationSchema = yup.object().shape({
  roleId: numberCheck,
})
