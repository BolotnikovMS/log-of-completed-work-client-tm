import * as yup from 'yup'

export const validationSchema = yup.object().shape({
	substationId: yup
		.number()
		.positive()
		.integer()
		.required('Поле является обязательным!'),
	workProducerId: yup
		.number()
		.positive()
		.integer()
		.required('Поле является обязательным!'),
	description: yup
		.string()
		.trim()
		.required('Поле является обязательным!')
		.min(2, 'Минимальная длина поля 2 символа!')
		.max(1000, 'Максимальная длина поля 1000 символов!'),
	note: yup.lazy((value: string) => value && value.length ? yup.string().trim().min(3, 'Минимальная длина поля 3 символа!').max(700, 'Максимальная длина поля 700 символов!') : yup.string().notRequired()),
	dateCompletion: yup
		.date()
		.required('Поле является обязательным!')
})
