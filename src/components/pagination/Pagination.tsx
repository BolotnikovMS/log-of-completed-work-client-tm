import { type FC } from 'react'
import { Button, Icon } from '..'
import { IPropsPagination } from './pagination.interface'

const Pagination: FC<IPropsPagination> = ({ meta, page, setPage }) => {
	const { firstPage, lastPage } = meta

	if (firstPage === lastPage) return null

	return (
		<div className='flex justify-center'>
			<div className="join">
				<Button className='join-item' onClick={() => setPage(Math.max(page - 1, 1))} disabled={page === firstPage}>
					<Icon id='arrow-left' />
					Назад
				</Button>
				<Button className='join-item' disabled>
					{page}
				</Button>
				<Button className='join-item' onClick={() => setPage(Math.min(page + 1, lastPage))} disabled={page === lastPage}>
					Дальше
					<Icon id='arrow-right' />
				</Button>
			</div>
		</div>
	)
}

export default Pagination
