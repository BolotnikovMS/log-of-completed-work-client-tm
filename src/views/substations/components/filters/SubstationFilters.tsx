import { type FC } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { SubstationFlterParameters } from '..'
import { Button, Dropdown, Group, Icon, LoaderLine, Modal, Search, Sort } from '../../../../components'
import { pageConfig } from '../../../../config/pages.config'
import { EFilterParam } from '../../../../enums/filterParam.enums'
import { useDownloadExcelSubstations, useModal } from '../../../../hooks'
import { TOrderSort } from '../../../../types/order.types'

const SubstationFilters: FC = () => {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const orderSort = searchParams.get('order') || 'asc'
  const sort = searchParams.get('sort') || 'name'
  const sortOptions = [
    { value: 'name', label: 'А-Я', icon: <Icon id='sort-asc' />, order: 'asc' as TOrderSort },
    { value: 'name', label: 'Я-А', icon: <Icon id='sort-desc' />, order: 'desc' as TOrderSort },
    { value: 'rdu', label: 'РДУ', icon: <Icon id='alert' />, order: 'desc' as TOrderSort },
  ]
  const districtParam = searchParams.get(EFilterParam.district)
  const typeKpParam = searchParams.get(EFilterParam.typeKp)
  const headControllerParam = searchParams.get(EFilterParam.headController)
  const channelCategoryParam = searchParams.get(EFilterParam.channelCategory)
  const channelTypeParam = searchParams.get(EFilterParam.channelType)
  const { isLoading: isLoadingDownloadExcel, fetchData: downloadExcel } = useDownloadExcelSubstations({ page: 1, limit: -1, typeKp: typeKpParam, headController: headControllerParam, channelCategory: channelCategoryParam, channelType: channelTypeParam, district: districtParam })
  const { isModal: isModalFilters, toggleModal: toggleModalFilters } = useModal()

  return (
    <>
      <div className='w-full flex gap-1 items-center justify-between'>
        <Group className='!flex-row'>
          <Sort orderSort={orderSort as TOrderSort} sort={sort} sortOptions={sortOptions} />
          {location.pathname === pageConfig.substations && (
            <>
              <Dropdown
                classMenu='dropdown-bottom'
                children={
                  <>
                    <Icon id='file-export' />
                    Экспорт
                  </>
                }
                menuItems={[
                  <Button onClick={downloadExcel} disabled={isLoadingDownloadExcel}>
                    <Icon id='excel' />
                    {isLoadingDownloadExcel ? <LoaderLine /> : 'Сохранить в Excel'}
                  </Button>
                ]}
              />
              <Button onClick={() => toggleModalFilters()}>
                {districtParam || typeKpParam || headControllerParam || channelCategoryParam || channelTypeParam ?
                  <Icon id='filter-remove' /> :
                  <Icon id='filter' />
                }
                Фильтры
              </Button>
            </>
          )}
        </Group>
        <div className="search-wrapper">
          <Search
            name='substation'
            classSearch='!input-sm'
            placeholderText='Поиск ПС...'
          />
        </div>
      </div>
      <Modal
        visible={isModalFilters}
        title='Фильтры'
        content={<SubstationFlterParameters toggleModal={toggleModalFilters} />}
        onToggle={toggleModalFilters}
      />
    </>
  )
}

export default SubstationFilters
