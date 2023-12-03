import './load-more.scss'

import { Button } from '..'
import { IPropsLoadMore } from './loadMore.interface'
import React from 'react'

export const LoadMore: React.FC<IPropsLoadMore> = ({ hasNextPage, isFetching, isFetchingNextPage, fetchNextPage }) => {
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
