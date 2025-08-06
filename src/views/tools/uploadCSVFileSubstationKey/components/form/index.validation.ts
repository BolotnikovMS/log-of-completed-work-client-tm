// import * as yup from 'yup';

// // export const validationSchema = yup.object().shape({
// // 	csvFile: yup.string().oneOf(['text/csv']).required('Файл должен быть в формате CSV!'),
// // 	// size: yup.number().max(10 * 1024 * 1024, 'Размер файла не должен превышать 10MB').required()
// // })
// // export const validationSchema = yup.mixed()
// // 	.test('Файл должен быть в формате CSV!', 'csvFile', (value: File) => value)
// // 	.test('Size', 'File size must be less than 20kb', (value: File) => value && value?.size <= 20000)
// export const validationSchema = yup.object().shape({
// 	csvFile: yup.mixed<File>()
// 		// .test(
// 		// 	'fileSize',
// 		// 	'Only documents up to 2MB are permitted.',
// 		// 	(file) => {
// 		// 		console.log(file)
// 		// 		!file || file.size <= 1024
// 		// 	}
// 		// )
// 		.test('Файл должен быть формата CSV!',
// 			(file) => {
// 				console.log(file)
// 				if (file) {
// 					const supportedFormats = ['csv']

// 					return supportedFormats.includes(file.name)
// 				}

// 				return true
// 			}
// 		)
// 		.required('Поле является обязательным!')
// 	// .test('fileSize', 'File size must be less than 3MB', (file) => {
// 	// 	console.log(file)

// 	// 	if (file) {
// 	// 		return file.size <= 3145728
// 	// 	}
// 	// 	return true;
// 	// }),
// })
