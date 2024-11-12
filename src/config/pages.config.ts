class PageConfig {
  statistics = '/'
  districts = '/districts'
  districtSubstations = '/districts/:id/substations'
  substations = '/substations'
  substation = '/substations/:id'
  voltageClasses = '/voltage-classes'
  typesKp = '/types-kp'
  headControllers = '/head-controllers'
  channelCategories = '/channel-categories'
  channelTypes = '/channel-types'
  channelingEquipments = '/channeling-equipments'
  channels = '/channels'
  gsmOperators = '/gsm-operators'
  typesWork = '/types-work'
  completedWorks = '/completed-works'
  users = '/users'
  profile = '/profile'
  signIn = '/sign-in'
  notFound = '*'

  getDynamicUrl(template: string, params: Record<string, string | number>): string {
    let url = template

    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        url = url.replace(`:${key}`, String(params[key]))
      }
    }

    return url
  }
}

export const pageConfig = new PageConfig()
