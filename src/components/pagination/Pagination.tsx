import { type FC } from 'react'
import { Button, Icon } from '..'
import { IPropsPagination } from './pagination.interface'

const Pagination: FC<IPropsPagination> = ({ meta, page, setPage }) => {
  const { first_page, last_page } = meta

  if (first_page === last_page) return null


  return (
    <div className='flex justify-center'>
      <div className="join">
        <Button className='join-item' onClick={() => setPage(Math.max(page - 1, 1))} disabled={page === first_page}>
          <Icon id='arrow-left' />
          Назад
        </Button>
        <Button className='join-item' disabled>
          {page}
        </Button>
        <Button className='join-item' onClick={() => setPage(Math.min(page + 1, last_page))} disabled={page === last_page}>
          Дальше
          <Icon id='arrow-right' />
        </Button>
      </div>
    </div>
  )
}

export default Pagination
