import { type FC } from 'react'
import { Page } from '../../../components'
import { UploadCSVSubstationKey } from './components'

const PageUploadCSVFileSubstationKey: FC = () => {
	return (
		<Page
			title='Форма загрузки файла ключей для связки с ЖД.'
			children={<UploadCSVSubstationKey />}
		/>
	)
}

export default PageUploadCSVFileSubstationKey
