import { useCallback, type FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button, Dropdown } from '../..'
import { TOrderSort } from '../../../types/order.types'
import { IPropsSort } from './sort.interface'

const Sort: FC<IPropsSort> = ({ orderSort, sort, sortOptions }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const handleSort = useCallback((orderValue: TOrderSort, sortValue: string = 'name') => {
    searchParams.set('order', orderValue)
    searchParams.set('sort', sortValue)
    setSearchParams(searchParams)
  }, [searchParams, setSearchParams])

  return (
    <>
      <Dropdown
        classMenu='dropdown-bottom'
        children={
          <>
            {sortOptions.map(option => (
              option.value === sort && option.order === orderSort && <span key={option.value}>{option.icon}</span>
            ))}
          </>
        }
        menuItems={sortOptions.map(option => (
          <Button key={option.value} onClick={() => handleSort(option.order, option.value)}>
            {option.icon}
            {option.label}
          </Button>
        ))}
      />
    </>
  )
}

export default Sort
