import { create } from 'zustand'
import { IUserLogin } from '../../interfaces'

interface IUserStore {
	authUser: IUserLogin | null
	requestLoading: boolean
	setAuthUser: (user: IUserLogin | null) => void
	setRequestLoading: (isLoading: boolean) => void
}

export const useAuthStore = create<IUserStore>((set) => ({
	authUser: null,
	requestLoading: false,
	setAuthUser: (user) => set((state) => ({ ...state, authUser: user })),
  setRequestLoading: (isLoading) =>
    set((state) => ({ ...state, requestLoading: isLoading })),
}))