// import * as yup from 'yup';

// // export const validationSchema = yup.object().shape({
// // 	csvFile: yup.string().oneOf(['text/csv']).required('Файл должен быть в формате CSV!'),
// // 	// size: yup.number().max(10 * 1024 * 1024, 'Размер файла не должен превышать 10MB').required()
// // })
// // export const validationSchema = yup.mixed()
// // 	.test('Файл должен быть в формате CSV!', 'csvFile', (value: File) => value)
// // 	.test('Size', 'File size must be less than 20kb', (value: File) => value && value?.size <= 20000)
// export const validationSchema = yup.object().shape({
// 	file: yup.mixed<FileList>()
// 		// .test(
// 		// 	'fileSize',
// 		// 	'Only documents up to 2MB are permitted.',
// 		// 	(file) => {
// 		// 		console.log(file)
// 		// 		!file || file.size <= 1024
// 		// 	}
// 		// )
// 		// .test('Файл должен быть формата CSV!',
// 		// 	(file) => {
// 		// 		console.log(file)
// 		// 		if (file) {
// 		// 			const supportedFormats = ['csv']

// 		// 			return supportedFormats.includes(file[0].name)
// 		// 		}

// 		// 		return true
// 		// 	}
// 		// )
// 		.test(
// 			'fileSize',
// 			'Only documents up to 2MB are permitted.',
// 			files => {
// 				console.log(files)
// 				!files || // Check if `files` is defined
// 					files.length === 0 || // Check if `files` is not an empty list
// 					Array.from(files).every(file => file.size <= 2_000_000)
// 			}
// 		).required('Поле является обязательным!')
// })
