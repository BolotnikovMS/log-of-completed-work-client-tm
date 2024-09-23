import { ICustomTooltip } from './customTooltip.interface'

const CustomTooltip = ({ payload, active }: ICustomTooltip) => {
  if (active) {
    const { name, numberSubstations } = payload[0].payload

    return (
      <div className="py-2 px-2 bg-gray-200/80 rounded-2xl">
        <p className="recharts-text font-bold">{`${name}: `}
          <span className='font-normal'>
            {numberSubstations}
          </span>
        </p>
      </div>
    )
  }

  return null
}

export default CustomTooltip
