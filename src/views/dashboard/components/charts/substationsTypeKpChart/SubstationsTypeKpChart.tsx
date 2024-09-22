import { type FC } from 'react'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Error, Loader } from '../../../../../components'
import { useSubstationsTypeKp } from '../../../../../hooks'
import { ICustomBarLabel } from './substationsTypeKpChart.interface'

const SubstationsTypeKpChart: FC = () => {
  const { data, error, isError, isLoading } = useSubstationsTypeKp()
  const renderCustomBarLabel = ({ x, y, width, value }: ICustomBarLabel) => {
    return <text className='recharts-text' x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>{`${value}`}</text>
  }

  if (isLoading) return <Loader />
  if (isError && error) return <Error error={error} />

  return (
    <ResponsiveContainer width='100%' height={330}>
      <BarChart width={500} height={330} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign='top' height={55} />
        <Bar name='Количество объектов по типу КП' barSize={50} dataKey="numberSubstations" fill="#03ACEF" label={renderCustomBarLabel} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default SubstationsTypeKpChart
