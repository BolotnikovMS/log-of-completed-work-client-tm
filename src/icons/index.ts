import { lazy } from 'react'
import ChevronDown from './chevron-down.svg?react'
import Login from './login.svg?react'
import Logout from './logout.svg?react'
import NoteDone from './note-done.svg?react'
import Profile from './profile.svg?react'

const Add = lazy(() => import('./add.svg?react'))
const Alert = lazy(() => import('./alert.svg?react'))
const ArrowLeftLine = lazy(() => import('./arrow-left-line.svg?react'))
const ArrowLeft = lazy(() => import('./arrow-left.svg?react'))
const ArrowRightLine = lazy(() => import('./arrow-right-line.svg?react'))
const ArrowRight = lazy(() => import('./arrow-right.svg?react'))
const Calendar = lazy(() => import('./calendar.svg?react'))
const Delete = lazy(() => import('./delete.svg?react'))
const Download = lazy(() => import('./download.svg?react'))
const Edit = lazy(() => import('./edit.svg?react'))
const FileAdd = lazy(() => import('./file-add.svg?react'))
const FilterAdd = lazy(() => import('./filter-add.svg?react'))
const FilterRemove = lazy(() => import('./filter-remove.svg?react'))
const Filter = lazy(() => import('./filter.svg?react'))
const ImgOff = lazy(() => import('./img-off.svg?react'))
const Key = lazy(() => import('./key.svg?react'))
const Note = lazy(() => import('./note.svg?react'))
const Search = lazy(() => import('./search.svg?react'))
const Setting = lazy(() => import('./setting.svg?react'))
const SortAsc = lazy(() => import('./sort-asc.svg?react'))
const SortDesc = lazy(() => import('./sort-desc.svg?react'))
const Upload = lazy(() => import('./upload.svg?react'))

export { Add, Alert, ArrowLeft, ArrowLeftLine, ArrowRight, ArrowRightLine, Calendar, ChevronDown, Delete, Download, Edit, FileAdd, Filter, FilterAdd, FilterRemove, ImgOff, Key, Login, Logout, Note, NoteDone, Profile, Search, Setting, SortAsc, SortDesc, Upload }
