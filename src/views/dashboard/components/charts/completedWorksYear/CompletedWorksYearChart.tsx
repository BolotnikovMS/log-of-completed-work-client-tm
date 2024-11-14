import { type FC } from 'react'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { CustomAxisTickChart, CustomBarChartLabel, CustomTooltipChart, Error, InfoMessage, Loader } from '../../../../../components'
import { pageConfig } from '../../../../../config/pages.config'
import { useCompletedWorksYear } from '../../../../../hooks'

const CompletedWorksYearChart: FC = () => {
  const { data, error, isError, isLoading } = useCompletedWorksYear()

  if (!data?.length) return <InfoMessage text='Статистики для отображения нет...' />
  if (isLoading) return <Loader />
  if (isError && error) return <Error error={error} />

  return (
    <ResponsiveContainer width='100%' height={330}>
      <BarChart width={500} height={330} data={data}>
        <XAxis
          dataKey='year'
          tick={
            <CustomAxisTickChart x={0} y={0}
              payload={undefined}
              linkTemplate={
                (year) => pageConfig.getDynamicUrl(pageConfig.completedWorks, {}, { dateStart: `${year}-01-01`, dateEnd: `${+year + 1}-01-01` })}
            />
          }
        />
        <YAxis />
        <Tooltip content={<CustomTooltipChart active={false} payload={[]} labelKey={'year'} valueKey={'workCount'} labelText='году выполненно работ: ' />} />
        <Legend verticalAlign='top' height={55} />
        <Bar
          name='Количество выполненных работ по годам'
          barSize={50}
          dataKey="workCount"
          fill="#03ACEF"
          label={<CustomBarChartLabel x={0} y={0} width={0} value={0} labelClass='font-bold' />}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default CompletedWorksYearChart
