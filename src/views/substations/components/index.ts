import { lazy } from 'react'
import { UploadSubstationFile } from './forms/uploadFile/UploadSubstationFile'

const SubstationControl = lazy(() => import('./control/substationControl/SubstationControl'))
const SubstationsCards = lazy(() => import('./substations-cards/SubstationsCards'))
const SubstationForm = lazy(() => import('./forms/createSubstation/SubstationForm'))
const SubstationInfo = lazy(() => import('./info/SubstationInfo'))
const SubstationFilters = lazy(() => import('./filters/SubstationFilters'))
const BackupTable = lazy(() => import('./table/backupTable/BackupTable'))
const ImageTable = lazy(() => import('./table/imageTable/ImageTable'))
const SubstationInfoControl = lazy(() => import('./control/infoControl/SubstationInfoControl'))

export { BackupTable, ImageTable, SubstationControl, SubstationFilters, SubstationForm, SubstationInfo, SubstationInfoControl, SubstationsCards, UploadSubstationFile }

