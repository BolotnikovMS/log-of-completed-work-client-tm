import * as yup from 'yup'
import { numberCheck, text240 } from '../../../../validations/rules'

export const validationSchema = yup.object().shape({
  channelTypeId: numberCheck,
  name: text240
})
