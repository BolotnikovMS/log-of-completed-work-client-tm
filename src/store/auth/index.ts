import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IUser } from '../../interfaces'

interface IUserStore {
	authUser: IUser | null
	requestLoading: boolean
	setAuthUser: (user: IUser | null) => void
	setRequestLoading: (isLoading: boolean) => void
}

export const useAuthStore = create<IUserStore>()(persist(
	(set) => ({
		authUser: null,
		requestLoading: false,
		setAuthUser: (user) => set((state) => ({ ...state, authUser: user })),
		setRequestLoading: (isLoading) => set((state) => ({ ...state, requestLoading: isLoading })),
	}),
	{
		name: 'auth_user',
		partialize: (state) => ({ authUser: state.authUser })
	}
))