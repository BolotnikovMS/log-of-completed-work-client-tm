import cx from 'classnames'
import { type FC } from 'react'
import { Link } from 'react-router-dom'
import { ICustomAxisTickChart } from './customAxisTickChart.interface'

const CustomAxisTickChart: FC<ICustomAxisTickChart> = ({ x, y, payload, labelClass, textAnchor = 'middle', linkTemplate = () => '#', renderValue = (value) => value, valueSeparator = '-' }) => {
	if (payload) {
		const { value } = payload
		const [qsParam, textLabel] = value.split(valueSeparator)
		const link = linkTemplate(qsParam)

		return (
			<g transform={`translate(${x},${y})`}>
				<text className={cx('recharts-text', labelClass)} x={0} y={0} dy={16} textAnchor={textAnchor} >
					<Link to={link}>
						{renderValue(qsParam, textLabel)}
					</Link>
				</text>
			</g>
		)
	}

	return null
}

export default CustomAxisTickChart
