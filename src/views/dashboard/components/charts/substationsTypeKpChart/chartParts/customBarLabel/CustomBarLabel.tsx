import { ICustomBarLabel } from './customBarLabel.interface'

const CustomBarLabel = ({ x, y, width, value }: ICustomBarLabel) => {
  return <text className='recharts-text' x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>{`${value}`}</text>
}

export default CustomBarLabel
