import * as yup from "yup"

export const validationSchema = yup.object().shape({
	name: yup
		.string()
		.required('Поле является обязательным!')
		.min(2, 'Минимальная длина поля 2 символа!')
		.max(240, 'Максимальная длина поля 240 символов!'),
})