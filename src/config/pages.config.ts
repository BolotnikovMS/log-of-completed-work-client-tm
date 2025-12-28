class PageConfig {
	statistics = '/'
	districts = '/districts'
	districtSubstations = '/districts/:id/substations'
	objectTypes = '/object-types'
	substations = '/substations'
	substationInfo = '/substations/:id/info'
	voltageClasses = '/voltage-classes'
	typesKp = '/types-kp'
	headControllers = '/head-controllers'
	channelCategories = '/channel-categories'
	channelTypes = '/channel-types'
	channelingEquipments = '/channeling-equipments'
	channels = '/channels'
	operators = '/gsm-operators'
	typesWork = '/types-work'
	completedWorks = '/completed-works'
	users = '/users'
	tmCoefficientCalculator = '/tm-coefficient-calculator'
	profile = '/profile'
	signIn = '/sign-in'
	uploadCSVFileSubstationsKey = '/files/upload-substation-key'
	logs = '/logs'
	notFound = '*'

	getDynamicUrl(template: string, params: Record<string, string | number>, queryParams?: Record<string, string | number>): string {
		let url: string = template

		params = params ?? {}
		for (const key in params) {
			if (Object.prototype.hasOwnProperty.call(params, key)) {
				url = url.replace(`:${key}`, String(params[key]))
			}
		}

		queryParams = queryParams ?? {}
		const searchParams = new URLSearchParams()

		for (const key in queryParams) {
			if (Object.prototype.hasOwnProperty.call(queryParams, key)) {
				searchParams.append(String(key), String(queryParams[key]))
			}
		}

		const queryString = searchParams.toString()

		if (queryString) {
			url += `?${queryString}`
		}

		return url
	}
}

export const pageConfig = new PageConfig()
