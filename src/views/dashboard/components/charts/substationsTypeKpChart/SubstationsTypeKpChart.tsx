import { type FC } from 'react'
import { Link } from 'react-router-dom'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Error, Loader } from '../../../../../components'
import { useSubstationsTypeKp } from '../../../../../hooks'
import { ICustomAxisTick, ICustomBarLabel, ICustomTooltip } from './substationsTypeKpChart.interface'

const SubstationsTypeKpChart: FC = () => {
  const { data, error, isError, isLoading } = useSubstationsTypeKp()
  const transformedData = data?.map(item => ({
    ...item,
    combinedKey: `${item.id}-${item.name}`
  }))
  const renderCustomBarLabel = ({ x, y, width, value }: ICustomBarLabel) => {
    return <text className='recharts-text' x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>{`${value}`}</text>
  }
  const CustomAxisTick = ({ x, y, payload }: ICustomAxisTick) => {
    const { value } = payload
    const [id, name] = value.split('-')
    const link = `/substations?typeKp=${id}`

    return (
      <g transform={`translate(${x},${y})`}>
        <text className='recharts-text' x={0} y={0} dy={16} textAnchor="middle" fill="#666">
          <Link to={link}>
            {name}
          </Link>
        </text>
      </g>
    )
  }
  const CustomTooltip = ({ payload, active }: ICustomTooltip) => {
    if (active) {
      const { name, numberSubstations } = payload[0].payload

      return (
        <div className="py-2 px-2 bg-gray-200/80 rounded-lg">
          <p className="recharts-text font-bold">{`${name}:`} <span className='font-normal'>{numberSubstations}</span></p>
        </div>
      )
    }

    return null;
  }

  if (isLoading) return <Loader />
  if (isError && error) return <Error error={error} />

  return (
    <ResponsiveContainer width='100%' height={330}>
      <BarChart width={500} height={330} data={transformedData}>
        <XAxis dataKey='combinedKey' tick={CustomAxisTick} />
        <YAxis />
        <Tooltip content={<CustomTooltip active={false} payload={[]} />} />
        <Legend verticalAlign='top' height={55} />
        <Bar name='Количество объектов по типу КП' barSize={50} dataKey="numberSubstations" fill="#03ACEF" label={renderCustomBarLabel} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default SubstationsTypeKpChart
