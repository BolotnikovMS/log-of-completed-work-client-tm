import { useEffect, useMemo, useState, type FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import AsyncSelect from 'react-select'
import { Button, Error, Group, Icon, LoaderLine } from '../../../../components'
import { useChannelTypes, useDistricts, useDownloadExcelSubstations, useHeadControllers, useTypesKp } from '../../../../hooks'
import { EFilterSubstation } from './substationFilter.enum'
import { IPropsSubstationFlterParameters } from './substationFlterParameters.interface'

const SubstationFlterParameters: FC<IPropsSubstationFlterParameters> = ({ toggleModal }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const districtParam = searchParams.get(EFilterSubstation.district)
  const typeKpParam = searchParams.get(EFilterSubstation.typeKp)
  const headControllerParam = searchParams.get(EFilterSubstation.headController)
  const mainChannelParam = searchParams.get(EFilterSubstation.mainChannel)
  const bacupChannelParam = searchParams.get(EFilterSubstation.backupChannel)
  const [district, setDistrict] = useState<string | null>()
  const [typeKp, setTypeKp] = useState<string | null>()
  const [headController, setHeadController] = useState<string | null>()
  const [mainChannel, setMainChannel] = useState<string | null>()
  const [backupChannel, setBuckupChannel] = useState<string | null>()
  const { districts, isError: isErrorDistricts, error: errorDistricts, isLoading: isLoadingDistricts } = useDistricts({})
  const { typesKp, isError: isErrorTypeKp, error: errorTypeKp, isLoading: isLoadingTypeKp } = useTypesKp({})
  const { headControllers, isError: isErrorHeadController, error: errorHeadController, isLoading: isLoadingHeadController } = useHeadControllers()
  const { data: typesChannel, isError: isErrorTypesChannel, error: errorTypesChannel, isLoading: isLoadingTypesChannel } = useChannelTypes()

  useEffect(() => {
    setDistrict(districtParam)
    setTypeKp(typeKpParam)
    setHeadController(headControllerParam)
    setMainChannel(mainChannelParam)
    setBuckupChannel(bacupChannelParam)
  }, [typeKpParam, headControllerParam, mainChannelParam, bacupChannelParam, districtParam])

  const updateSearchParams = () => {
    district && searchParams.set(EFilterSubstation.district, district)
    typeKp && searchParams.set(EFilterSubstation.typeKp, typeKp)
    headController && searchParams.set(EFilterSubstation.headController, headController)
    mainChannel && searchParams.set(EFilterSubstation.mainChannel, mainChannel)
    backupChannel && searchParams.set(EFilterSubstation.backupChannel, backupChannel)
    setSearchParams(searchParams)
  }
  const applyFilters = () => {
    updateSearchParams()
    toggleModal()
  }
  const clearQueryParams = () => setSearchParams({})
  // const handleDownload = () => SubstationService.downloadExcel({ typeKp, headController, mainChannel, backupChannel, district })
  const { isFetching: isFetchingDownloadExcel, refetch } = useDownloadExcelSubstations({ page: 1, limit: -1, typeKp, headController, mainChannel, backupChannel, district })
  const handleDownload = () => refetch()

  const errorMessage = useMemo(() => (isErrorTypeKp || isErrorHeadController || isErrorTypesChannel || isErrorDistricts) && <Error error={errorTypeKp! || errorHeadController! || errorTypesChannel! || errorDistricts!} />, [errorTypeKp, errorHeadController, errorTypesChannel, errorDistricts, isErrorHeadController, isErrorTypeKp, isErrorTypesChannel, isErrorDistricts])

  return (
    <div className='filters !h-[540px]'>
      {errorMessage}
      <Group className='!gap-4'>
        <Group>
          <AsyncSelect
            classNamePrefix='form__custom-select'
            options={districts?.data}
            value={district ? districts?.data.find(s => s.id === +district) : null}
            getOptionValue={option => option.id.toString()}
            getOptionLabel={option => option.name}
            onChange={option => setDistrict(option ? option.id.toString() : null)}
            isLoading={isLoadingDistricts}
            isDisabled={isErrorDistricts}
            placeholder="Выберите Район/ГП/УС..."
          />
        </Group>
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
            placeholder="Выберите тип головного контроллера..."
          />
        </Group>
        <Group>
          <AsyncSelect
            classNamePrefix='form__custom-select'
            options={typesChannel?.data}
            value={mainChannel ? typesChannel?.data.find(c => c.id === +mainChannel) : null}
            getOptionValue={option => option.id.toString()}
            getOptionLabel={option => option.name}
            onChange={option => setMainChannel(option ? option.id.toString() : null)}
            isLoading={isLoadingTypesChannel}
            isDisabled={isErrorTypesChannel}
            placeholder="Выберите основной канал..."
          />
        </Group>
        <Group>
          <AsyncSelect
            classNamePrefix='form__custom-select'
            options={typesChannel?.data}
            value={backupChannel ? typesChannel?.data.find(c => c.id === +backupChannel) : null}
            getOptionValue={option => option.id.toString()}
            getOptionLabel={option => option.name}
            onChange={option => setBuckupChannel(option ? option.id.toString() : null)}
            isLoading={isLoadingTypesChannel}
            isDisabled={isErrorTypesChannel}
            placeholder="Выберите резервный канал..."
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
        <Button onClick={handleDownload} disabled={isFetchingDownloadExcel}>
          <Icon id='excel' />
          {isFetchingDownloadExcel ? <LoaderLine /> : 'Сохранить в Excel'}
        </Button>
      </div>
    </div >
  )
}

export default SubstationFlterParameters
