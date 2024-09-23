import { type FC } from 'react'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Error, Loader } from '../../../../../components'
import { useSubstationsTypeKp } from '../../../../../hooks'
import { CustomAxisTick, CustomBarLabel, CustomTooltip } from './chartParts'

const SubstationsTypeKpChart: FC = () => {
  const { data, error, isError, isLoading } = useSubstationsTypeKp()
  const transformedData = data?.map(item => ({
    ...item,
    combinedKey: `${item.id}-${item.name}`
  }))

  if (isLoading) return <Loader />
  if (isError && error) return <Error error={error} />

  return (
    <ResponsiveContainer width='100%' height={330}>
      <BarChart width={500} height={330} data={transformedData}>
        <XAxis dataKey='combinedKey' tick={CustomAxisTick} />
        <YAxis />
        <Tooltip content={<CustomTooltip active={false} payload={[]} />} />
        <Legend verticalAlign='top' height={55} />
        <Bar name='Количество объектов по типу КП' barSize={50} dataKey="numberSubstations" fill="#03ACEF" label={CustomBarLabel} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default SubstationsTypeKpChart
