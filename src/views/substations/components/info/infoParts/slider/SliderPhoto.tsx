import { MouseEvent, useEffect, useState, type FC } from 'react'
import { CustomSlider, Icon } from '../../../../../../components'
import { urlFile } from '../../../../../../constants'
import { IPropsPartsInfo } from '../partsInfo.interfaces'

const SliderPhoto: FC<IPropsPartsInfo> = ({ substation }) => {
	const [currentImgName, setCurrentImgName] = useState<string>('')

	useEffect(() => {
		if (substation?.files_photos_ps?.length) {
			setCurrentImgName(substation.files_photos_ps[0].clientName)
		}
	}, [])

	if (!substation) return null

	const toggleFullscreen = (e: MouseEvent<HTMLDivElement, MouseEvent>) => {
		const target = e.currentTarget as HTMLDivElement

		if (target.requestFullscreen) {
			if (!document.fullscreenElement) {
				target.requestFullscreen().catch((err) => console.error('Error entering fullscreen:', err))
			} else {
				document.exitFullscreen().catch((err) => console.error('Error exiting fullscreen:', err))
			}
		} else {
			console.warn('Fullscreen API is not supported in this browser.')
		}
	}
	const handleSlideChange = (index: number) => {
		if (!substation.files_photos_ps) return null

		setCurrentImgName(substation.files_photos_ps[index].clientName)
	}

	return (
		<div className="substation-info__imgs">
			{substation.files_photos_ps?.length ? (
				<>
					<CustomSlider onTransitionStart={(e) => handleSlideChange(e.nextIndex)}>
						{substation.files_photos_ps.map(photo => (
							<div key={photo.id} data-src={`${urlFile}${photo.filePath}`} onClick={(e) => toggleFullscreen(e)} />
						))}
					</CustomSlider>
					<div className='mt-4'>
						<p className='text-content'>{currentImgName}</p>
					</div>
				</>
			) : (
				<Icon id='img-off' className='!w-96 !h-96' />
			)}
		</div>
	)
}

export default SliderPhoto
