import { type FC } from 'react'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { CustomAxisTickChart, CustomBarChartLabel, CustomTooltipChart, Error, InfoMessage, Loader } from '../../../../../components'
import { pageConfig } from '../../../../../config/pages.config'
import { useSubstationsTypeKp } from '../../../../../hooks'

const SubstationsTypeKpChart: FC = () => {
  const { data, error, isError, isLoading } = useSubstationsTypeKp()

  if (!data?.length) return <InfoMessage text='Статистики для отображения нет...' />

  const transformedData = data?.map(item => ({
    ...item,
    combinedKey: `${item.id}:${item.name}`
  }))

  if (isLoading) return <Loader />
  if (isError && error) return <Error error={error} />

  return (
    <ResponsiveContainer width='100%' height={330}>
      <BarChart width={500} height={330} data={transformedData}>
        <XAxis
          dataKey='combinedKey'
          tickFormatter={(value) => value.substring(0, 5)}
          tick={
            <CustomAxisTickChart x={0} y={0}
              payload={undefined}
              linkTemplate={
                (typeKpId) => pageConfig.getDynamicUrl(pageConfig.substations, {}, { typeKp: typeKpId })}
              renderValue={(_, textLabel) => textLabel}
              valueSeparator=':'
            />
          }
        />
        <YAxis />
        <Tooltip content={<CustomTooltipChart active={false} payload={[]} labelKey={'name'} valueKey={'numberSubstations'} labelText='в количестве: ' />} />
        <Legend verticalAlign='top' height={55} />
        <Bar
          name='Количество объектов по типу КП'
          barSize={40}
          dataKey="numberSubstations"
          fill="#03ACEF"
          label={<CustomBarChartLabel x={0} y={0} width={0} value={0} labelClass='font-bold' />}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default SubstationsTypeKpChart
