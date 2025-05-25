import { MouseEvent, useEffect, useState, type FC } from 'react'
import { CustomSlider, Icon } from '../../../../../../components'
import { urlFile } from '../../../../../../constants'
import { TFile } from '../../../../../../types'
import FileControl from '../../../control/fileControl/FileControl'
import { IPropsPartsInfo } from '../partsInfo.interfaces'

const SliderPhoto: FC<IPropsPartsInfo> = ({ substation }) => {
	const [currentImg, setCurrentImg] = useState<TFile | null>(null)

	useEffect(() => {
		if (substation?.files_photos_ps?.length) {
			setCurrentImg(substation.files_photos_ps[0])
		}
	}, [substation?.files_photos_ps])

	if (!substation) return null

	const toggleFullscreen = (e: MouseEvent) => {
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

		setCurrentImg(substation.files_photos_ps[index])
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
					<div className='flex items-center gap-3 mt-7'>
						<p className='text-content'>{currentImg?.clientName}</p>
						<FileControl file={currentImg} classDropDown='dropdown-end' />
					</div>
				</>
			) : (
				<Icon id='img-off' className='!w-96 !h-96' />
			)}
		</div>
	)
}

export default SliderPhoto
