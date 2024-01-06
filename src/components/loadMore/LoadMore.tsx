import './load-more.scss'

import { type FC } from 'react'
import { Button } from '..'
import { IPropsLoadMore } from './loadMore.interface'

const LoadMore: FC<IPropsLoadMore> = ({ hasNextPage, isFetching, isFetchingNextPage, fetchNextPage }) => {
  return (
    <div className='load-more'>
      <Button classBtn='btn-bg_blue' type='button' onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
        {isFetchingNextPage || isFetching ? 
          'Загрузка...' : 
          hasNextPage ?
            'Показать еще' :
            'Больше нет данных'
        }
      </Button>
    </div>
  )
}

export default LoadMore