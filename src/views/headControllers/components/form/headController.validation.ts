import * as yup from "yup"

export const validationSchema = yup.object().shape({
	name: yup
		.string()
		.trim()
		.required('Поле является обязательным!')
		.min(2, 'Минимальная длина поля 2 символа!')
		.max(180, 'Максимальная длина поля 180 символов!'),
})