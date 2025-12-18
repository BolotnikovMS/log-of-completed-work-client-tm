import { type FC } from 'react'
import { Card } from '../../components'
import { CompletedWorksYearChart, SubstationsTypeKpChart } from './components'

const Dashboard: FC = () => {
	return (
		<div className='flex flex-col gap-4'>
			<Card
				classContent='justify-center'
				childrenContent={
					<SubstationsTypeKpChart />
				}
			/>
			<Card
				classContent='justify-center'
				childrenContent={
					<CompletedWorksYearChart />
				}
			/>
		</div>
	)
}

export default Dashboard
