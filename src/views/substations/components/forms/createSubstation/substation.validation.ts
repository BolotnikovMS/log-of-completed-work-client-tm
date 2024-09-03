import * as yup from 'yup'

import { ipOptional, numberCheck, text240 } from '../../../../../validations/rules'

export const validationSchema = yup.object().shape({
  districtId: numberCheck,
  typeKpId: numberCheck,
  headControllerId: numberCheck,
  mainChannelId: numberCheck,
  backupChannelId: numberCheck,
  additionalChannelId: numberCheck,
  gsmId: numberCheck,
  name: text240,
  voltageClassesId: numberCheck,
  mainChannelIp: ipOptional,
  backupChannelIp: ipOptional,
  rdu: yup
    .boolean()
    .default(false),
  active: yup
    .boolean()
    .default(true)
})
