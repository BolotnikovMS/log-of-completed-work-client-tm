import ru from 'date-fns/locale/ru'
import moment from 'moment'
import { useEffect, useMemo, useState, type FC } from 'react'
import { default as DatePicker } from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { useSearchParams } from 'react-router-dom'
import AsyncSelect from 'react-select'
import { Button, Error, Group } from '../../../../components'
import { useSubstations, useUsers } from '../../../../hooks'
import { Calendar, Excel, FilterAdd, FilterRemove } from '../../../../icons'
import { CompletedWorkService } from '../../../../services/completed-work/completed-work.service'
import { EFilterType } from './compleated-filter.enum'
import { IPropsCompletedWorkFilters } from './compleated-filter.interface'
import './compleated-filter.scss'

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
  const handleDownload = () => CompletedWorkService.downloadExcel({ page: 1, limit: -1, substation, executor, dateStart, dateEnd })
  const errorMessage = useMemo(() => (isErrorSubstations || isErrorExecutors) && <Error error={errorSubstations! || errorExecutors!} />, [errorExecutors, errorSubstations, isErrorExecutors, isErrorSubstations])

  return (
    <div className='filters'>
      {errorMessage}
      <Group className='group-col w-full'>
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
      </Group>
      <Group className='group-jcse'>
        <div className='filters__text'>
          <p>Промежуток времени</p>
        </div>
        <Group className='group-no-gap'>
          <DatePicker
            dateFormat='dd.MM.yyyy'
            locale={ru}
            className='filters__date-input'
            showIcon
            icon={
              <Calendar />
            }
            popperPlacement="top-end"
            placeholderText='Дату начала'
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
            className='filters__date-input'
            showIcon
            icon={
              <Calendar />
            }
            popperPlacement="top-end"
            placeholderText='Дату окончания'
            selected={dateEnd}
            onChange={(date) => setDateEnd(date)}
            isClearable
            autoComplete='off'
          />
        </Group>
      </Group>
      <div className='filters__btns'>
        <Button className='mBtn_outline-green' onClick={applyFilters}>
          <FilterAdd className='icon' />
          Применить фильтры
        </Button>
        <Button onClick={clearQueryParams}>
          <FilterRemove className='icon' />
          Очистить фильтры
        </Button>
        <Button onClick={handleDownload}>
          <Excel className='icon' />
          Сохранить в Excel
        </Button>
      </div>
    </div>
  )
}

export default CompletedWorkFilters
