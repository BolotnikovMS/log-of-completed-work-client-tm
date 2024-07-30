import { Filter, FilterX, Plus } from 'lucide-react'
import { type FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CompletedWorkFilters, CompletedWorkForm } from '..'
import { Button, Modal } from '../../../../components'
import { useModal } from '../../../../hooks'

const CompletedWorkControl: FC = () => {
  const [searchParams] = useSearchParams()
  const { isModal, toggleModal } = useModal()
  const { isModal: isModalFilters, toggleModal: toggleModalFilters } = useModal()

  return (
    <div className="work-log__control control">
      <div className="control__wrapper">
        <Button classBtn='btn-bg_green' onClick={() => toggleModal()}>
          <Plus />
        </Button>
        <Button classBtn='btn-bg_trnt' onClick={() => toggleModalFilters()}>
          {searchParams.size ? <FilterX className='lucide-filter' /> : <Filter className='lucide-filter' />}
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
          content={<CompletedWorkFilters toggleModal={toggleModalFilters} />}
          onToggle={toggleModalFilters}
        />
      </div>
    </div>
  )
}

export default CompletedWorkControl
