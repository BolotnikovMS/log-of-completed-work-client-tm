import { type FC } from 'react'
import { Card } from '../../components'
import { SubstationsTypeKpChart } from './components'

const Dashboard: FC = () => {
  return (
    <>
      <Card
        classContent='justify-center'
        childrenContent={
          <SubstationsTypeKpChart />
        }
      />
    </>
  )
}

export default Dashboard
