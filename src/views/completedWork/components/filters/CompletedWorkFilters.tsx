import ru from 'date-fns/locale/ru'
import moment from 'moment'
import { useEffect, useMemo, useState, type FC } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { useSearchParams } from 'react-router-dom'
import AsyncSelect from 'react-select'
import { Button, CustomDatePicker, Error, Group, Icon, LoaderLine } from '../../../../components'
import { useDownloadExcelCompletedWork, useSubstations, useUsers } from '../../../../hooks'
import { EFilterType } from './compleated-filter.enum'
import { IPropsCompletedWorkFilters } from './compleated-filter.interface'

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
  const { isLoading: isLoadingDownloadExcel, fetchData: downloadExcel } = useDownloadExcelCompletedWork({ page: 1, limit: -1, substation, executor, dateStart, dateEnd })
  const errorMessage = useMemo(() => (isErrorSubstations || isErrorExecutors) && <Error error={errorSubstations! || errorExecutors!} />, [errorExecutors, errorSubstations, isErrorExecutors, isErrorSubstations])

  return (
    <div className='filters'>
      {errorMessage}
      <Group className='!gap-4'>
        <Group>
          <AsyncSelect
            classNamePrefix='form__custom-select'
            options={substations?.data}
            value={substation ? substations?.data.find(s => s.id === +substation) : null}
            getOptionValue={option => option.id.toString()}
            getOptionLabel={option => option.fullNameSubstation}
            onChange={option => setSubstation(option ? option.id.toString() : null)}
            isLoading={isLoadingSubstations}
            isDisabled={isErrorSubstations}
            placeholder="Выберите ПС..."
          />
        </Group>
        <Group>
          <AsyncSelect
            classNamePrefix='form__custom-select'
            options={executors?.data}
            value={executor ? executors?.data.find(s => s.id === +executor) : null}
            getOptionValue={option => option.id.toString()}
            getOptionLabel={option => option.fullName}
            onChange={option => setExecutor(option ? option.id.toString() : null)}
            isLoading={isLoadingExecutors}
            isDisabled={isErrorExecutors}
            placeholder="Выберите производителя работ..."
          />
        </Group>
      </Group>
      <Group className='!gap-4'>
        <div className='text-center'>
          <p className='text-title font-bold'>Промежуток времени</p>
        </div>
        <Group>
          <CustomDatePicker
            dateFormat='dd.MM.yyyy'
            locale={ru}
            selected={dateStart}
            onChange={(date) => setDateStart(date)}
            iconLeft={<Icon id='calendar' className='!w-6 !h-6' />}
            autoComplete='off'
            placeholderText='От'
            popperPlacement="left"
          />
        </Group>
        <Group>
          <CustomDatePicker
            dateFormat='dd.MM.yyyy'
            locale={ru}
            selected={dateEnd}
            onChange={(date) => setDateEnd(date)}
            iconLeft={<Icon id='calendar' className='!w-6 !h-6' />}
            autoComplete='off'
            placeholderText='До'
            popperPlacement="left"
          />
        </Group>
      </Group>
      <div className='filters__btns'>
        <Button className='mBtn_outline-green' onClick={applyFilters}>
          <Icon id='filter-add' />
          Применить фильтры
        </Button>
        <Button onClick={clearQueryParams}>
          <Icon id='filter-remove' />
          Очистить фильтры
        </Button>
        <Button onClick={downloadExcel} disabled={isLoadingDownloadExcel}>
          <Icon id='excel' />
          {isLoadingDownloadExcel ? <LoaderLine /> : 'Сохранить в Excel'}
        </Button>
      </div>
    </div>
  )
}

export default CompletedWorkFilters
