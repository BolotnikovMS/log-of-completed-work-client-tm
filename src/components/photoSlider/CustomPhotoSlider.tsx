import { type FC } from 'react'
import { PhotoSlider } from 'react-photo-view'
import { IPhotoSliderProps } from 'react-photo-view/dist/PhotoSlider'
import 'react-photo-view/dist/react-photo-view.css'
import { Tooltip } from '..'
import { Button } from '../button/Button'
import Icon from '../icon/Icon'

const CustomPhotoSlider: FC<IPhotoSliderProps> = (props) => {
	return (
		<PhotoSlider
			toolbarRender={({ rotate, onRotate, scale, onScale }) => {
				return (
					<div className='flex gap-2'>
						<Tooltip text='Повернуть' className='!tooltip-bottom'>
							<Button className='PhotoView-Slider__toolbarIcon' onClick={() => onRotate(rotate + 90)}><Icon id='reload' /></Button>
						</Tooltip>
						<Tooltip text='Увеличить' className='!tooltip-bottom'>
							<Button className='PhotoView-Slider__toolbarIcon' onClick={() => onScale(scale + 1)}>
								<Icon id='plus-circle' />
							</Button>
						</Tooltip>
						<Tooltip text='Уменьшить' className='!tooltip-bottom'>
							<Button className='PhotoView-Slider__toolbarIcon' onClick={() => onScale(scale - 1)}>
								<Icon id='minus-circle' />
							</Button>
						</Tooltip>
					</div>
				)
			}}
			{...props}
		/>
	)
}

export default CustomPhotoSlider
