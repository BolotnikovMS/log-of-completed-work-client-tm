import { lazy } from 'react'

const SubstationControl = lazy(() => import('./control/SubstationControl'))
const SubstationsCards = lazy(() => import('./substations-cards/SubstationsCards'))
const SubstationForm = lazy(() => import('./form/SubstationForm'))
const SubstationInfo = lazy(() => import('./info/SubstationInfo'))
const SubstationFilters = lazy(() => import('./filters/SubstationFilters'))
const BackupTable = lazy(() => import('./backupTable/BackupTable'))

export { BackupTable, SubstationControl, SubstationFilters, SubstationForm, SubstationInfo, SubstationsCards }

