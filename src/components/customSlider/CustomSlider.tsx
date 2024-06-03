import { type FC } from 'react'
import AwesomeSlider, { AwesomeSliderProps } from 'react-awesome-slider'
import 'react-awesome-slider/dist/captioned.css'
import 'react-awesome-slider/dist/styles.css'
import './custom-slider.scss'

export const CustomSlider: FC<AwesomeSliderProps> = ({children, ...props}) => {
	return (
		<AwesomeSlider className='aws-btn' {...props}>
			{children}
		</AwesomeSlider>
	)
}
