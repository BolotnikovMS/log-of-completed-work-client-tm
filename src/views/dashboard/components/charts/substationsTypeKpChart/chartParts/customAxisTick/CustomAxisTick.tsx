import { Link } from 'react-router-dom'
import { ICustomAxisTick } from './customAxisTick.interface'

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

export default CustomAxisTick
