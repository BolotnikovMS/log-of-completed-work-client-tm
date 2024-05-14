import { lazy } from 'react'
import { UploadSubstationFile } from './forms/uploadFile/UploadSubstationFile'

const SubstationControl = lazy(() => import('./control/SubstationControl'))
const SubstationsCards = lazy(() => import('./substations-cards/SubstationsCards'))
const SubstationForm = lazy(() => import('./forms/createSubstation/SubstationForm'))
const SubstationInfo = lazy(() => import('./info/SubstationInfo'))
const SubstationFilters = lazy(() => import('./filters/SubstationFilters'))
const BackupTable = lazy(() => import('./backupTable/BackupTable'))

export { BackupTable, SubstationControl, SubstationFilters, SubstationForm, SubstationInfo, SubstationsCards, UploadSubstationFile }

