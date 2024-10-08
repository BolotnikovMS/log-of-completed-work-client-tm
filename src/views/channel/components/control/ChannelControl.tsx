import { type FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ChannelFilter, ChannelForm } from '..'
import { Button, Dropdown, Icon, LoaderLine, Modal } from '../../../../components'
import { EFilterParam } from '../../../../enums/filterParam.enums'
import { ERoles } from '../../../../enums/roles.enum'
import { checkRole } from '../../../../helpers'
import { useDownloadExcelChannel, useModal } from '../../../../hooks'
import { useAuthStore } from '../../../../store/auth'

const ChannelControl: FC = () => {
  const [searchParams] = useSearchParams()
  const substationParam = searchParams.get(EFilterParam.substation)
  const channelTypeParam = searchParams.get(EFilterParam.channelType)
  const channelCategoryParam = searchParams.get(EFilterParam.channelCategory)
  const { authUser } = useAuthStore()
  const isAdmin = checkRole(authUser, [ERoles.Admin])
  const { isModal, toggleModal } = useModal()
  const { isModal: isModalFilters, toggleModal: toggleModalFilters } = useModal()
  const { isLoading: isLoadingDownloadExcel, fetchData: downloadExcel } = useDownloadExcelChannel({ page: 1, limit: -1, substation: substationParam, channelType: channelTypeParam, channelCategory: channelCategoryParam })

  return (
    <div className="work-log__control">
      <div className="control__wrapper">
        {isAdmin && (
          <Button className='mBtn_outline-green' onClick={() => toggleModal()}>
            <Icon id='add' />
            Добавить
          </Button>
        )}
        <Modal
          visible={isModal}
          title='Форма добавления канала'
          content={<ChannelForm toggleModal={toggleModal} />}
          onToggle={toggleModal}
        />
        <div className='flex items-center gap-2'>
          <Dropdown
            classMenu='dropdown-bottom dropdown-end'
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
            {searchParams.size ?
              <Icon id='filter-remove' /> :
              <Icon id='filter' />
            }
            Фильтры
          </Button>
        </div>
        <Modal
          visible={isModalFilters}
          title='Фильтры'
          classDialog=''
          content={<ChannelFilter toggleModal={toggleModalFilters} />}
          onToggle={toggleModalFilters}
        />
      </div>
    </div>
  )
}

export default ChannelControl
