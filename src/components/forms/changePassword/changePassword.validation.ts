import * as yup from 'yup'

export const validationSchema = yup.object().shape({
	password: yup
		.string()
		.trim()
		.required('Поле является обязательным!')
		.min(6, 'Минимальная длина пароля 6 символов!'),
	passwordConfirm: yup
		.string()
		.trim()
		.required('Поле является обязательным!')
		.min(6, 'Минимальная длина пароля 6 символов!')
		.oneOf([yup.ref('password')], 'Введенные пароли не совпадают!'),
})
