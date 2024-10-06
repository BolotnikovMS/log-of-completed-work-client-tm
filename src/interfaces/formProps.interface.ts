export interface IPropsForm<T> {
  data?: T | null
  isEdited?: boolean | null
  toggleModal: () => void
  setIsEdited?: (val: boolean) => void
}
