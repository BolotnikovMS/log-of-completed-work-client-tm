import { useEffect, useMemo, useState, type FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import AsyncSelect from 'react-select'
import { Button, Error, Group } from '../../../../components'
import { useHeadControllers, useTypesKp } from '../../../../hooks'
import { FilterAdd, FilterRemove } from '../../../../icons'
import { EFilterSubstation } from './substationFilter.enum'

interface IPropsSubstationFlterParameters {
  toggleModal: () => void
}

const SubstationFlterParameters: FC<IPropsSubstationFlterParameters> = ({ toggleModal }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const typeKpParam = searchParams.get('typeKp')
  const headControllerParam = searchParams.get('headController')
  const [typeKp, setTypeKp] = useState<string | null>()
  const [headController, setHeadController] = useState<string | null>()
  const { typesKp, isError: isErrorTypeKp, error: errorTypeKp, isLoading: isLoadingTypeKp } = useTypesKp({})
  const { headControllers, isError: isErrorHeadController, error: errorHeadController, isLoading: isLoadingHeadController } = useHeadControllers()

  useEffect(() => {
    setTypeKp(typeKpParam)
    setHeadController(headControllerParam)
  }, [typeKpParam, headControllerParam])

  const updateSearchParams = () => {
    typeKp && searchParams.set(EFilterSubstation.typeKp, typeKp)
    headController && searchParams.set(EFilterSubstation.headController, headController)
    setSearchParams(searchParams)
  }
  const applyFilters = () => {
    updateSearchParams()
    toggleModal()
  }
  const clearQueryParams = () => setSearchParams({})

  const errorMessage = useMemo(() => (isErrorTypeKp || isErrorHeadController) && <Error error={errorTypeKp! || errorHeadController!} />, [errorTypeKp, errorHeadController, isErrorHeadController, isErrorTypeKp])

  return (
    <div className='filters'>
      {errorMessage}
      <Group className='!gap-4'>
        <Group>
          <AsyncSelect
            classNamePrefix='form__custom-select'
            options={typesKp?.data}
            value={typeKp ? typesKp?.data.find(s => s.id === +typeKp) : null}
            getOptionValue={option => option.id.toString()}
            getOptionLabel={option => option.name}
            onChange={option => setTypeKp(option ? option.id.toString() : null)}
            isLoading={isLoadingTypeKp}
            isDisabled={isErrorTypeKp}
            isClearable
            placeholder="Выберите тип КП..."
          />
        </Group>
        <Group>
          <AsyncSelect
            classNamePrefix='form__custom-select'
            options={headControllers?.data}
            value={headController ? headControllers?.data.find(s => s.id === +headController) : null}
            getOptionValue={option => option.id.toString()}
            getOptionLabel={option => option.name}
            onChange={option => setHeadController(option ? option.id.toString() : null)}
            isLoading={isLoadingHeadController}
            isDisabled={isErrorHeadController}
            isClearable
            placeholder="Выберите тип головного контроллера..."
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
      </div>
    </div>
  )
}

export default SubstationFlterParameters
