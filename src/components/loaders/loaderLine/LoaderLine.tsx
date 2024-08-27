import { type FC } from "react"
import './loader-line.scss'

const LoaderLine: FC = () => {
  return (
    <div className='loader__wrapper'>
      <span className='loader !bg-blue-300'></span>
    </div>
  )
}

export default LoaderLine
