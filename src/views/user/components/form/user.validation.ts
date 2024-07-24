import * as yup from 'yup'
import { email, numberCheck, text20, text30 } from '../../../../validations/rules'

export const validationSchema = yup.object().shape({
  username: text30,
  surname: text20,
  name: text20,
  patronymic: text20,
  position: text30,
  email: email,
  password: yup
    .string()
    .required('Поле является обязательным!')
    .min(6, 'Минимальная длина поля 6 символа!'),
  roleId: numberCheck,
})
