import ru from 'date-fns/locale/ru'
import moment from 'moment'
import { useEffect, useMemo, useState, type FC } from 'react'
import { default as DatePicker } from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { useSearchParams } from 'react-router-dom'
import AsyncSelect from 'react-select'
import { Button, Error, Group } from '../../../../components'
import { useSubstations, useUsers } from '../../../../hooks'
import { Calendar, FilterAdd, FilterRemove } from '../../../../icons'
import { EFilterType } from './compleated-filter.enum'
import { IPropsCompletedWorkFilters } from './compleated-filter.interface'
import styles from './compleated-filter.module.scss'

const CompletedWorkFilters: FC<IPropsCompletedWorkFilters> = ({ toggleModal }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const substationParam = searchParams.get('substation')
  const executorParam = searchParams.get('executor')
  const dateStartParam = searchParams.get('dateStart')
  const dateEndParam = searchParams.get('dateEnd')
  const [substation, setSubstation] = useState<string | null>()
  const [executor, setExecutor] = useState<string | null>()
  const [dateStart, setDateStart] = useState<Date | null>()
  const [dateEnd, setDateEnd] = useState<Date | null>()
  const { substations, isError: isErrorSubstations, error: errorSubstations, isLoading: isLoadingSubstations } = useSubstations({})
  const { data: executors, isError: isErrorExecutors, error: errorExecutors, isLoading: isLoadingExecutors } = useUsers({})

  useEffect(() => {
    setSubstation(substationParam)
    setExecutor(executorParam)
    setDateStart(dateStartParam ? new Date(dateStartParam) : null)
    setDateEnd(dateEndParam ? new Date(dateEndParam) : null)
  }, [substationParam, executorParam, dateStartParam, dateEndParam])

  const updateSearchParams = () => {
    substation && searchParams.set(EFilterType.substation, substation)
    executor && searchParams.set(EFilterType.executor, executor)
    if (dateStart && dateEnd) {
      searchParams.set(EFilterType.dateStart, moment(dateStart).format('YYYY-MM-DD'))
      searchParams.set(EFilterType.dateEnd, moment(dateEnd).format('YYYY-MM-DD'))
    }
    setSearchParams(searchParams)
  }
  const applyFilters = () => {
    updateSearchParams()
    toggleModal()
  }
  const clearQueryParams = () => setSearchParams({})
  const errorMessage = useMemo(() => (isErrorSubstations || isErrorExecutors) && <Error error={errorSubstations! || errorExecutors!} />, [errorExecutors, errorSubstations, isErrorExecutors, isErrorSubstations])

  return (
    <div className={styles.filters}>
      {errorMessage}
      <div className={styles.filtersContent}>
        <Group className='group-col group-str'>
          <AsyncSelect
            classNamePrefix='form__custom-select'
            options={substations?.data}
            value={substation ? substations?.data.find(s => s.id === +substation) : null}
            getOptionValue={option => option.id.toString()}
            getOptionLabel={option => option.fullNameSubstation}
            onChange={option => setSubstation(option ? option.id.toString() : null)}
            isLoading={isLoadingSubstations}
            isDisabled={isErrorSubstations}
            isClearable
            placeholder="Выберите ПС..."
          />
        </Group>
        <Group className='group-col group-str'>
          <AsyncSelect
            classNamePrefix='form__custom-select'
            options={executors?.data}
            value={executor ? executors?.data.find(s => s.id === +executor) : null}
            getOptionValue={option => option.id.toString()}
            getOptionLabel={option => option.fullName}
            onChange={option => setExecutor(option ? option.id.toString() : null)}
            isLoading={isLoadingExecutors}
            isDisabled={isErrorExecutors}
            isClearable
            placeholder="Выберите производителя работ..."
          />
        </Group>
        <div className={styles.filtersText}>
          <p>Промежуток времени</p>
        </div>
        <Group className='group-jcse'>
          <Group className='group-no-gap'>
            <DatePicker
              dateFormat='dd.MM.yyyy'
              locale={ru}
              className={styles.filtersDataInput}
              showIcon
              icon={
                <Calendar />
              }
              popperPlacement="top-end"
              placeholderText='Укажите дату начала'
              selected={dateStart}
              onChange={(date) => setDateStart(date)}
              isClearable
              autoComplete='off'
            />
          </Group>
          <Group className='group-no-mg group-no-gap'>
            <DatePicker
              dateFormat='dd.MM.yyyy'
              locale={ru}
              className={styles.filtersDataInput}
              showIcon
              icon={
                <Calendar />
              }
              popperPlacement="top-end"
              placeholderText='Укажите дату окончания'
              selected={dateEnd}
              onChange={(date) => setDateEnd(date)}
              isClearable
              autoComplete='off'
            />
          </Group>
        </Group>
      </div>
      <div className={styles.filtersBtns}>
        <Button classBtn='btn-bg_green' onClick={applyFilters}>
          <FilterAdd className='icon' />
          Применить фильтры
        </Button>
        <Button onClick={clearQueryParams}>
          <FilterRemove className='icon' />
          Очистить фильтры
        </Button>
      </div>
    </div>
  )
}

export default CompletedWorkFilters
