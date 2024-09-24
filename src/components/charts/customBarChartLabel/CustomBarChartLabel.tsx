import cx from 'classnames'
import { type FC } from 'react'
import { ICustomBarChartLabel } from './customBarChartLabel.interface'

const CustomBarChartLabel: FC<ICustomBarChartLabel> = ({ x, y, width, value, textAnchor = 'middle', labelClass }) => {
  return <text className={cx('recharts-text', labelClass)} x={x + width / 2} y={y} fill="#666" textAnchor={textAnchor} dy={-6}>{`${value}`}</text>
}

export default CustomBarChartLabel
