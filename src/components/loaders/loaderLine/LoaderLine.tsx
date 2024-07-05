import { type FC } from "react"
import styles from './loader-line.module.scss'

const LoaderLine: FC = () => {
  return (
    <div className={styles.loaderWrapper}>
      <span className={styles.loader}></span>
    </div>
  )
}

export default LoaderLine
