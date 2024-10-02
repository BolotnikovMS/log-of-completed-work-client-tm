import * as yup from 'yup'
import { text180 } from '../../../../validations/rules'

export const validationSchema = yup.object().shape({
  name: text180
})
