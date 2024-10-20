import ru from 'date-fns/locale/ru'
import moment from 'moment'
import { useEffect, useMemo, useState, type FC } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { useSearchParams } from 'react-router-dom'
import AsyncSelect from 'react-select'
import { Button, CustomDatePicker, Error, Group, Icon } from '../../../../components'
import { EFilterParam } from '../../../../enums/filterParam.enums'
import { useSubstations, useTypesWork, useUsers } from '../../../../hooks'
import { IPropsCompletedWorkFilters } from './compleated-filter.interface'

const CompletedWorkFilters: FC<IPropsCompletedWorkFilters> = ({ toggleModal }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const substationParam = searchParams.get(EFilterParam.substation)
  const executorParam = searchParams.get(EFilterParam.executor)
  const dateStartParam = searchParams.get(EFilterParam.dateStart)
  const dateEndParam = searchParams.get(EFilterParam.dateEnd)
  const typeWorkParams = searchParams.get(EFilterParam.typeWork)
  const [substation, setSubstation] = useState<string | null>(null)
  const [executor, setExecutor] = useState<string | null>(null)
  const [dateStart, setDateStart] = useState<Date | null>(null)
  const [dateEnd, setDateEnd] = useState<Date | null>(null)
  const [typeWork, setTypeWork] = useState<string[] | null | undefined>(null)
  const { substations, isError: isErrorSubstations, error: errorSubstations, isLoading: isLoadingSubstations } = useSubstations({})
  const { data: executors, isError: isErrorExecutors, error: errorExecutors, isLoading: isLoadingExecutors } = useUsers({})
  const { data: typesWork, isError: isErrorTypesWork, error: errorTypesWork, isLoading: isLoadingTypesWork } = useTypesWork()

  useEffect(() => {
    setSubstation(substationParam)
    setExecutor(executorParam)
    setDateStart(dateStartParam ? new Date(dateStartParam) : null)
    setDateEnd(dateEndParam ? new Date(dateEndParam) : null)
    setTypeWork(typeWorkParams?.split(','))
  }, [dateEndParam, dateStartParam, executorParam, substationParam, typeWorkParams])

  const updateSearchParams = () => {
    substation && searchParams.set(EFilterParam.substation, substation)
    executor && searchParams.set(EFilterParam.executor, executor)
    if (dateStart && dateEnd) {
      searchParams.set(EFilterParam.dateStart, moment(dateStart).format('YYYY-MM-DD'))
      searchParams.set(EFilterParam.dateEnd, moment(dateEnd).format('YYYY-MM-DD'))
    }
    typeWork && searchParams.set(EFilterParam.typeWork, typeWork.join(','))
    setSearchParams(searchParams)
  }
  const applyFilters = () => {
    updateSearchParams()
    toggleModal()
  }
  const clearQueryParams = () => setSearchParams({})
  const errorMessage = useMemo(() => (isErrorSubstations || isErrorExecutors || isErrorTypesWork) && <Error error={errorSubstations! || errorExecutors! || errorTypesWork!} />, [errorExecutors, errorSubstations, errorTypesWork, isErrorExecutors, isErrorSubstations, isErrorTypesWork])

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
        <Group>
          <AsyncSelect
            classNamePrefix='form__custom-select'
            options={typesWork?.data}
            value={typeWork ? typesWork?.data.filter(tw => typeWork.includes(tw.id.toString())) : []}
            getOptionValue={option => option.id.toString()}
            getOptionLabel={option => option.name}
            onChange={options => setTypeWork(options ? options.map(opt => opt.id.toString()) : [])}
            isLoading={isLoadingTypesWork}
            isDisabled={isErrorTypesWork}
            isMulti
            placeholder="Выберите категорию работ..."
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
      </div>
    </div>
  )
}

export default CompletedWorkFilters
