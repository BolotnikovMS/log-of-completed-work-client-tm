import { type FC } from 'react'
import { Page } from '../../../components'
import LogsTable from './components/table'

const PageLogs: FC = () => {
	return (
		<Page
			title='Логи'
			children={
				<LogsTable />
			}
		/>
	)
}

export default PageLogs
