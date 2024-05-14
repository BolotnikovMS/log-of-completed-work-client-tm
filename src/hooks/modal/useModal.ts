import { useState } from 'react'

export const useModal = () => {
  const [isModal, setIsModal] = useState<boolean>(true)
  const toggleModal = () => setIsModal(!isModal)

  return { isModal, toggleModal }
}