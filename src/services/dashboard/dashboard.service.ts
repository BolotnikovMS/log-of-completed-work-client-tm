import { instance } from '../../api/axios.api'
import { url } from '../../constants'
import { ITypeKp } from '../../interfaces'

export const DashboardService = {
  async getSubstationsTypeKp(): Promise<ITypeKp[]> {
    const { data } = await instance.get<ITypeKp[]>(`${url}/dashboards/statistics-type-kp`)

    return data
  }
}
