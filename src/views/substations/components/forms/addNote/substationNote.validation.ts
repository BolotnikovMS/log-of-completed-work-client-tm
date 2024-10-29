import * as yup from 'yup'
import { text1000Optional } from '../../../../../validations/rules'

export const validationSchema = yup.object().shape({
  note: text1000Optional,
})
