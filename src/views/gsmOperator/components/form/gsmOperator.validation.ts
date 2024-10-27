import * as yup from 'yup'

import { text240 } from '../../../../validations/rules'

export const validationSchema = yup.object().shape({
  name: text240,
})
