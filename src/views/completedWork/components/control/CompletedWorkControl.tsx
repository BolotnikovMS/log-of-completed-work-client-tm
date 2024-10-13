import { type FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CompletedWorkFilters, CompletedWorkForm } from '..'
import { Button, Dropdown, Icon, LoaderLine, Modal } from '../../../../components'
import { useDownloadExcelCompletedWork, useModal } from '../../../../hooks'

const CompletedWorkControl: FC = () => {
  const [searchParams] = useSearchParams()
  const substationParam = searchParams.get('substation')
  const executorParam = searchParams.get('executor')
  const dateStartParam = searchParams.get('dateStart')
  const dateEndParam = searchParams.get('dateEnd')
  const { isModal, toggleModal } = useModal()
  const { isModal: isModalFilters, toggleModal: toggleModalFilters } = useModal()

  const { isLoading: isLoadingDownloadExcel, fetchData: downloadExcel } = useDownloadExcelCompletedWork({ page: 1, limit: -1, substation: substationParam, executor: executorParam, dateStart: dateStartParam, dateEnd: dateEndParam })

  return (
    <div className="work-log__control control">
      <div className="control__wrapper">
        <Button className='mBtn_outline-green' onClick={() => toggleModal()}>
          <Icon id='add' />
          Добавить
        </Button>
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
          visible={isModal}
          title='Форма добавления выполненной работы'
          content={<CompletedWorkForm toggleModal={toggleModal} />}
          onToggle={toggleModal}
        />
        <Modal
          visible={isModalFilters}
          title='Фильтры'
          classDialog=''
          content={<CompletedWorkFilters toggleModal={toggleModalFilters} />}
          onToggle={toggleModalFilters}
        />
      </div>
    </div>
  )
}

export default CompletedWorkControl
