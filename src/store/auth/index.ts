import { IUser } from '../../interfaces'

import { create } from 'zustand'

interface IUserStore {
	authUser: IUser | null
	requestLoading: boolean
	setAuthUser: (user: IUser | null) => void
	setRequestLoading: (isLoading: boolean) => void
}

export const useAuthStore = create<IUserStore>((set) => ({
	authUser: null,
	requestLoading: false,
	setAuthUser: (user) => set((state) => ({ ...state, authUser: user })),
  setRequestLoading: (isLoading) =>
    set((state) => ({ ...state, requestLoading: isLoading })),
}))