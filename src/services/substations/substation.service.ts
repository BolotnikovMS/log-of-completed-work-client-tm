import { TRespSubstations } from './substation.type'
import axios from 'axios'
import { url } from '../../constants'

export const SubstationService = {
  async getSubstations() {
    const response = await axios<TRespSubstations>(`${url}/substations`)

    return response.data
  }
}