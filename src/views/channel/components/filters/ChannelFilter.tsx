import { useEffect, useMemo, useState, type FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import AsyncSelect from 'react-select'
import { Button, Error, Group, Icon } from '../../../../components'
import { EFilterParam } from '../../../../enums/filterParam.enums'
import { useChannelTypes, useSubstations } from '../../../../hooks'

export interface IPropsChannelFilters {
  toggleModal: () => void
}

const ChannelFilter: FC<IPropsChannelFilters> = ({ toggleModal }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const substationParam = searchParams.get('substation')
  const channelTypeParam = searchParams.get('channelType')
  const [substation, setSubstation] = useState<string | null>()
  const [channelType, setChannelType] = useState<string | null>()
  const { substations, isError: isErrorSubstations, error: errorSubstations, isLoading: isLoadingSubstations } = useSubstations({})
  const { data: channelTypes, isError: isErrorChannelTypes, error: errorChannelTypes, isLoading: isLoadingChannelTypes } = useChannelTypes()

  useEffect(() => {
    setSubstation(substationParam)
    setChannelType(channelTypeParam)

  }, [channelTypeParam, substationParam])

  const updateSearchParams = () => {
    substation && searchParams.set(EFilterParam.substation, substation)
    channelType && searchParams.set(EFilterParam.channelType, channelType)

    setSearchParams(searchParams)
  }
  const applyFilters = () => {
    updateSearchParams()
    toggleModal()
  }
  const clearQueryParams = () => setSearchParams({})
  const errorMessage = useMemo(() => (isErrorSubstations || isErrorChannelTypes) && <Error error={errorSubstations! || errorChannelTypes!} />, [errorSubstations, errorChannelTypes, isErrorSubstations, isErrorChannelTypes])

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
            options={channelTypes?.data}
            value={channelType ? channelTypes?.data.find(s => s.id === +channelType) : null}
            getOptionValue={option => option.id.toString()}
            getOptionLabel={option => option.name}
            onChange={option => setChannelType(option ? option.id.toString() : null)}
            isLoading={isLoadingChannelTypes}
            isDisabled={isErrorChannelTypes}
            placeholder="Выберите тип канала..."
          />
        </Group>
      </Group>
      <Group>
        <Button className='mBtn_outline-green' onClick={applyFilters}>
          <Icon id='filter-add' />
          Применить фильтры
        </Button>
        <Button onClick={clearQueryParams}>
          <Icon id='filter-remove' />
          Очистить фильтры
        </Button>
      </Group>
    </div>
  )
}

export default ChannelFilter