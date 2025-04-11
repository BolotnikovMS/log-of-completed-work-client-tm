import { type FC } from 'react'
import { SmallCard } from '../../../../components'

const FolderCards: FC = () => {
	return (
		<div className='cards'>
			<SmallCard
				childrenContent={
					<p>File name</p>
				}
				childrenControl={
					<>
						<p>Размер</p>
						<p>Menu</p>
					</>
				}
			/>
			<SmallCard
				childrenContent={
					<p>File name</p>
				}
				childrenControl={
					<>
						<p>Размер</p>
						<p>Menu</p>
					</>
				}
			/>
			<SmallCard
				childrenContent={
					<p>File name</p>
				}
				childrenControl={
					<>
						<p>Размер</p>
						<p>Menu</p>
					</>
				}
			/>
		</div>
	)
}

export default FolderCards
