import { IDistrict } from './district.interface'
import axios from 'axios'
import { url } from '../../constants'

export const DistrictService = {
  async getDistricts() {
    const response = await axios.get<IDistrict[]>(`${url}/districts`)

    return response.data
  },
}
