import { type FC } from 'react'
import { Button } from '..'
import { IPropsLoadMore } from './loadMore.interface'

const LoadMore: FC<IPropsLoadMore> = ({ hasNextPage, isFetching, isFetchingNextPage, fetchNextPage }) => {
  return (
    <div className='flex items-center justify-center m-4'>
      <Button className='mBtn_primary' type='button' onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
        {isFetchingNextPage || isFetching ?
          <span className="loading loading-spinner"></span> :
          hasNextPage ?
            'Показать еще' :
            'Больше нет данных'
        }
      </Button>
    </div>
  )
}

export default LoadMore
