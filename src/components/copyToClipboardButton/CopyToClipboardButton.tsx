import { FC } from 'react'
import { toast } from 'react-toastify'
import { Tooltip } from '..'
import { Button } from '../button/Button'
import Icon from '../icon/Icon'
import { CopyToClipboardButtonProps } from './copyToClipboardButton.interface'

const CopyToClipboardButton: FC<CopyToClipboardButtonProps> =
	({ content, classNameBtn, children }) => {
		const handleCopy = () => {
			navigator.clipboard.writeText(content)
				.then(() => {
					toast.success('Текст скопирован!')
				})
				.catch(err => {
					toast.error('Ошибка при копирований текста!')

					console.log(err)
				})
		}

		return (
			<Tooltip text='Копировать'>
				<Button
					className={classNameBtn}
					onClick={handleCopy}
				>
					<Icon id='clipboard' />
					{children}
				</Button>
			</Tooltip>
		)
	}

export default CopyToClipboardButton
