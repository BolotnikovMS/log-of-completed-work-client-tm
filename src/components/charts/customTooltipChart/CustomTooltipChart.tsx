import cx from 'classnames'
import { type FC } from 'react'
import { IPropsCustomTooltip } from './customTooltipChart.interface'

const CustomTooltipChart: FC<IPropsCustomTooltip> = ({ active, payload, labelKey, valueKey, labelText = '', tooltipClassName, labelClassName, valueClassName }) => {
  if (active && payload && payload.length > 0) {
    const data = payload[0].payload
    const label = data[labelKey]
    const value = data[valueKey]

    return (
      <div className={cx('py-2 px-2 bg-gray-200/80 rounded-2xl', tooltipClassName)}>
        <p className={cx('recharts-text', labelClassName)}>{`${label} ${labelText}`}
          <span className={cx('font-bold', valueClassName)}>
            {value}
          </span>
        </p>
      </div>
    )
  }

  return null
}

export default CustomTooltipChart
