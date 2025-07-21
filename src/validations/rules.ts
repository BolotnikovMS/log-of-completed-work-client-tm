import * as yup from 'yup'
import { setLocale } from 'yup'

setLocale({
	number: {
		positive: 'Число должно быть позитивным!',
		integer: () => 'Число должно быть целое!'
	},
	string: {
		min: 'Минимальная длина поля ${min} символа!',
		max: 'Максимальная длина поля ${max} символов!',
	}
})

export const text20 = yup
	.string()
	.trim()
	.required('Поле является обязательным!')
	.min(2)
	.max(20)
export const text30 = yup
	.string()
	.trim()
	.required('Поле является обязательным!')
	.min(2)
	.max(30)
export const text140 = yup
	.string()
	.trim()
	.required('Поле является обязательным!')
	.min(2)
	.max(140)
export const text180 = yup
	.string()
	.trim()
	.required('Поле является обязательным!')
	.min(2)
	.max(180)
export const text240 = yup
	.string()
	.trim()
	.required('Поле является обязательным!')
	.min(2)
	.max(240)
export const text700Optional = yup
	.lazy((value: string) =>
		value && value.length ? yup
			.string()
			.trim()
			.min(3)
			.max(700)
			: yup
				.string()
				.notRequired())
export const text1000 = yup
	.string()
	.trim()
	.required('Поле является обязательным!')
	.min(2)
	.max(1000)
export const text1000Optional = yup
	.lazy((value: string) =>
		value && value.length ? yup
			.string()
			.trim()
			.min(2)
			.max(1000)
			: yup
				.string()
				.notRequired())
export const numberCheck = yup
	.number()
	.positive()
	.integer()
	.required('Поле является обязательным!')
export const numberOptional = yup
	.number()
	.nullable()
	.transform((value, originalValue) => originalValue === '' ? null : value)
	.integer()
	.positive()
	.typeError('Введите число!')
	.notRequired()
// .lazy((value: number) =>
//   value ? yup
//     .number()
//     .nullable()
//     .positive()
//     .integer()
//     .typeError('message')
//     : yup.string().nullable().notRequired())
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
