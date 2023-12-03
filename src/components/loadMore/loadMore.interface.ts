import { InfiniteQueryObserverResult } from '@tanstack/react-query'

export interface IPropsLoadMore {
  hasNextPage: boolean
  isFetching: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>
}