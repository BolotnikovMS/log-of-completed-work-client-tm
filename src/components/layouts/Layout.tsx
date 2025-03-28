import { Suspense, type FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Loader, NavBar } from '..'
import { useAuthStore } from '../../store/auth'

export const Layout: FC = () => {
	const userAuthStore = useAuthStore()

	if (userAuthStore.requestLoading) return <Loader />

	return (
		<div className='flex h-screen'>
			<Suspense fallback={<Loader />}>
				<NavBar />
			</Suspense>
			<main className='flex-1'>
				<div className="container mx-auto max-w-[100%] overflow-y-auto h-[100%]">
					<Suspense fallback={<Loader />}>
						<Outlet />
					</Suspense>
				</div>
			</main>
		</div>
	)
}
