import { FC } from 'react'
import { toast } from 'react-toastify'
import { Tooltip } from '..'
import { Button } from '../button/Button'
import Icon from '../icon/Icon'
import { CopyToClipboardButtonProps } from './copyToClipboardButton.interface'

const CopyToClipboardButton: FC<CopyToClipboardButtonProps> =
	({ content, classNameBtn, children }) => {
		const handleCopy = () => {
			const canUseClipboardAPI = navigator.clipboard && (window.isSecureContext || window.location.hostname === 'localhost')

			if (canUseClipboardAPI) {
				navigator.clipboard.writeText(content)
					.then(() => {
						toast.success('Текст скопирован!')
					})
					.catch(err => {
						toast.error('Ошибка при копирований текста!')

						console.log(err)
					})
			} else {
				// Fallback для HTTP
				fallbackCopyTextToClipboard(content)
			}
		}

		const fallbackCopyTextToClipboard = (text: string) => {
			const textArea = document.createElement('textarea');
			textArea.value = text;

			// Скрываем элемент, но делаем его видимым для selection
			textArea.style.position = 'fixed'
			textArea.style.left = '-9999px'
			textArea.style.top = '-9999px'

			document.body.appendChild(textArea)
			textArea.focus()
			textArea.select()

			try {
				const successful = document.execCommand('copy')

				if (successful) {
					toast.success('Текст скопирован!')
				} else {
					console.error('Не удалось скопировать текст')
					toast.error('Ошибка при копирований текста!')
				}
			} catch (err) {
				console.error('Ошибка при копировании (fallback): ', err)
			}

			document.body.removeChild(textArea);
		};

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
