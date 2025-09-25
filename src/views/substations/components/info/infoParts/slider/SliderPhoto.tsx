import { useEffect, useState, type FC } from 'react'
import { CustomPhotoSlider, CustomSlider, Icon } from '../../../../../../components'
import { urlFile } from '../../../../../../constants'
import { TFile } from '../../../../../../types'
import FileControl from '../../../control/fileControl/FileControl'
import { IPropsPartsInfo } from '../partsInfo.interfaces'

const SliderPhoto: FC<IPropsPartsInfo> = ({ substation }) => {
	const [index, setIndex] = useState<number>(0)
	const [currentImg, setCurrentImg] = useState<TFile | null>(null)
	const [visible, setVisible] = useState<boolean>(false)

	useEffect(() => {
		if (substation?.files_photos_ps?.length) {
			setCurrentImg(substation.files_photos_ps[index])
		}
	}, [index, substation?.files_photos_ps])

	if (!substation) return null

	const handleSlideChange = (index: number) => {
		if (!substation.files_photos_ps) return null

		setCurrentImg(substation.files_photos_ps[index])
		setIndex(index)
	}

	return (
		<div className="substation-info__imgs">
			{substation.files_photos_ps?.length ? (
				<>
					<CustomSlider
						onTransitionStart={(e) => handleSlideChange(e.nextIndex)}
						selected={index}
					>
						{substation.files_photos_ps.map(photo => (
							<div key={photo.id} data-src={`${urlFile}${photo.filePath}`} onClick={() => setVisible(true)} />
						))}
					</CustomSlider>
					<CustomPhotoSlider
						images={substation.files_photos_ps.map((item) => ({ src: `${urlFile}${item.filePath}`, key: item.id }))}
						visible={visible}
						onClose={() => setVisible(false)}
						index={index}
						onIndexChange={setIndex}
						fileName={currentImg?.clientName}
					/>
					<div className='flex items-center gap-3 mt-7'>
						<p className='text-content'>{currentImg?.clientName}</p>
						{
							currentImg && <FileControl file={currentImg} classDropDown='dropdown-end' />
						}
					</div>
				</>
			) : (
				<Icon id='img-off' className='!w-96 !h-96' />
			)}
		</div >
	)
}

export default SliderPhoto
