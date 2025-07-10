import { lazy } from 'react'
import { UploadSubstationFile } from './forms/uploadFile/UploadSubstationFile'

const SubstationControl = lazy(() => import('./control/substationControl/SubstationControl'))
const SubstationsCards = lazy(() => import('./substations-cards/SubstationsCards'))
const SubstationForm = lazy(() => import('./forms/createSubstation/SubstationForm'))
const SubstationInfo = lazy(() => import('./info/SubstationInfo'))
const SubstationFilters = lazy(() => import('./filters/SubstationFilters'))
const SubstationInfoControl = lazy(() => import('./control/infoControl/SubstationInfoControl'))
const SubstationFlterParameters = lazy(() => import('./filters/SubstationFlterParameters'))
const FileTable = lazy(() => import('./table/fileTable/FileTable'))
const SubstationNote = lazy(() => import('./forms/addNote/SubstationNote'))
const SubstationKeyDefectForm = lazy(() => import('./forms/updKeyDefect/SubstationKeyDefectForm'))

export { FileTable, SubstationControl, SubstationFilters, SubstationFlterParameters, SubstationForm, SubstationInfo, SubstationInfoControl, SubstationKeyDefectForm, SubstationNote, SubstationsCards, UploadSubstationFile }
