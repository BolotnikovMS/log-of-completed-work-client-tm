import { useMemo, useState, type FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Error } from '../../../../components'
import { useHeadControllers, useTypesKp } from '../../../../hooks'

interface IPropsSubstationFlterParameters {
  toggleModal: () => void
}

const SubstationFlterParameters: FC<IPropsSubstationFlterParameters> = ({ toggleModal }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const typeKpParam = searchParams.get('typeKp')
  const headControllerParam = searchParams.get('headController')
  const [typeKp, setTypeKp] = useState<string | null>()
  const [headController, setHeadController] = useState<string | null>()
  const { typesKp, isError: isErrorTypeKp, error: errorTypeKp, isLoading: isLoadingTypeKp } = useTypesKp({})
  const { headControllers, isError: isErrorHeadController, error: errorHeadController, isLoading: isLoadingHeadController } = useHeadControllers()

  const errorMessage = useMemo(() => (isErrorTypeKp || isErrorHeadController) && <Error error={errorTypeKp! || errorHeadController!} />, [errorTypeKp, errorHeadController, isErrorHeadController, isErrorTypeKp])

  return (
    <div>
      {errorMessage}
    </div>
  )
}

export default SubstationFlterParameters
