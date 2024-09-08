import { type FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CompletedWorkFilters, CompletedWorkForm } from '..'
import { Button, Icon, Modal } from '../../../../components'
import { useModal } from '../../../../hooks'

const CompletedWorkControl: FC = () => {
  const [searchParams] = useSearchParams()
  const { isModal, toggleModal } = useModal()
  const { isModal: isModalFilters, toggleModal: toggleModalFilters } = useModal()

  return (
    <div className="work-log__control control">
      <div className="control__wrapper">
        <Button className='mBtn_outline-green' onClick={() => toggleModal()}>
          <Icon id='add' />
          Добавить
        </Button>
        <Button onClick={() => toggleModalFilters()}>
          {searchParams.size ?
            <Icon id='filter-remove' /> :
            <Icon id='filter' />
          }
          Фильтры
        </Button>
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
