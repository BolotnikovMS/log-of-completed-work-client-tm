import * as yup from 'yup'

export const text20 = yup
	.string()
	.trim()
	.required('Поле является обязательным!')
	.min(2, 'Минимальная длина поля 2 символа!')
	.max(20, 'Максимальная длина поля 20 символов!')
export const text30 = yup
	.string()
	.trim()
	.required('Поле является обязательным!')
	.min(2, 'Минимальная длина поля 2 символа!')
	.max(30, 'Максимальная длина поля 30 символов!')
export const text140 = yup
	.string()
	.trim()
	.required('Поле является обязательным!')
	.min(2, 'Минимальная длина поля 2 символа!')
	.max(140, 'Максимальная длина поля 140 символов!')
export const text180 = yup
	.string()
	.trim()
	.required('Поле является обязательным!')
	.min(2, 'Минимальная длина поля 2 символа!')
	.max(180, 'Максимальная длина поля 180 символов!')
export const text240 = yup
	.string()
	.trim()
	.required('Поле является обязательным!')
	.min(2, 'Минимальная длина поля 2 символа!')
	.max(240, 'Максимальная длина поля 240 символов!')
export const text700Optional = yup
	.lazy((value: string) => 
		value && value.length ? yup
			.string()
			.trim()
			.min(3, 'Минимальная длина поля 3 символа!')
			.max(700, 'Максимальная длина поля 700 символов!') 
	: yup
		.string()
		.notRequired())
export const text1000 = yup
	.string()
	.trim()
	.required('Поле является обязательным!')
	.min(2, 'Минимальная длина поля 2 символа!')
	.max(1000, 'Максимальная длина поля 1000 символов!')
export const numberCheck = yup
	.number()
	.positive()
	.integer()
	.required('Поле является обязательным!')
export const numberOptional = yup
	.lazy((value: number) => 
		value ? yup
			.number()
			.positive()
			.integer()
		: yup.number().notRequired())
export const date = yup
	.date()
	.required('Поле является обязательным!')
export const ipOptional = yup
	.lazy((value: string) => 
		value && value.length ? 
			yup.string().trim().matches(/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/, 'Введите корректный ip адрес!') : 
			yup.string().notRequired())
export const email = yup
	.string()
	.trim()
	.email('Введите корректный email!')
	.matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/, 'Формат email: xxxx@xxx.xx')
	.required('Поле является обязательным!')