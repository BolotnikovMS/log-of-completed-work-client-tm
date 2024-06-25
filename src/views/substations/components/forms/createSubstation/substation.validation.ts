import * as yup from 'yup'

export const validationSchema = yup.object().shape({
	districtId: yup
		.number()
		.integer()
		.positive()
		.required('Поле является обязательным!'),
	typeKpId: yup
		.number()
		.integer()
		.positive()
		.required('Поле является обязательным!'),
	headControllerId: yup
		.number()
		.integer()
		.positive()
		.required('Поле является обязательным!'),
	mainChannelId: yup
		.number()
		.integer()
		.positive()
		.required('Поле является обязательным!'),
	backupChannelId: yup.lazy((value: number) => value ? yup.number().positive().integer() : yup.number().notRequired()),
	additionalChannelId: yup.lazy((value: number) => value ? yup.number().positive().integer() : yup.number().notRequired()),
	gsmId: yup.lazy((value: number) => value ? yup.number().positive().integer() : yup.number().notRequired()),
	name: yup
		.string()
		.trim()
		.required('Поле является обязательным!')
		.min(2, 'Минимальная длина поля 2 символа!')
		.max(240, 'Максимальная длина поля 240 символов!'),
	voltageClassesId: yup
		.number()
		.integer()
		.positive()
		.required('Поле является обязательным!!'),
	mainChannelIp: yup.lazy((value: string) => 
		value && value.length ? 
			yup.string().trim().matches(/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/, 'Введите корректный ip адрес!') : 
			yup.string().notRequired()),
	backupChannelIp: yup.lazy((value: string) => 
		value && value.length ? 
			yup.string().trim().matches(/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/, 'Введите корректный ip адрес!') : 
			yup.string().notRequired()),
	rdu: yup
		.boolean()
		.default(false),
	active: yup
		.boolean()
		.default(true)
})