import React from 'react'
import { useDistrictSubstations } from '../../../../hooks'
import { useParams } from 'react-router-dom'

export const Info: React.FC = () => {  
  const { id } = useParams()
  const { data, error, isError, isLoading } = useDistrictSubstations(id)

  console.log(data);
  
  
  return (
    <div>
      Substations
    </div>
  )
}
