import { instance } from '../../api/axios.api'
import { url } from '../../constants'
import { ICompletedWorkYear, ITypeKp } from '../../interfaces'

export const DashboardService = {
  async getSubstationsTypeKp(): Promise<ITypeKp[]> {
    const { data } = await instance.get<ITypeKp[]>(`${url}/dashboards/statistics-type-kp`)

    return data
  },
  async getCompletedWorksYear(): Promise<ICompletedWorkYear[]> {
    const { data } = await instance.get<ICompletedWorkYear[]>(`${url}/dashboards/statistics-completed-works-years`)

    return data
  }
}
