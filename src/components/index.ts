import { lazy } from 'react'
import { Button } from './button/Button'
import { Card } from './cards/card/Card'
import CardsSubstations from './cards/cardsSubstations/CardsSubstations'
import { SmallCard } from './cards/small-card/SmallCard'
import ChannelInfo from './channels/channelInfo/ChannelInfo'
import CustomAxisTickChart from './charts/customAxisTickChart/CustomAxisTickChart'
import CustomBarChartLabel from './charts/customBarChartLabel/CustomBarChartLabel'
import CustomTooltipChart from './charts/customTooltipChart/CustomTooltipChart'
import { SelectWrapper } from './customSelect/SelectWrapper'
import { CustomSlider } from './customSlider/CustomSlider'
import { Group } from './group/Group'
import Icon from './icon/Icon'
import { AuthLayout } from './layouts/AuthLayout'
import { Layout } from './layouts/Layout'
import { Loader } from './loaders/loader/Loader'
import { Modal } from './modal/Modal'
import { NavBar } from './navBar/NavBar'
import NumberRecords from './numberRecords/NumberRecords'
import { Page } from './page/Page'
import Pagination from './pagination/Pagination'
import { ProtectedRoute } from './protectedRoute/ProtectedRoute'
import { Router } from './routing/Router'
import ToggleTheme from './toggleTheme/ToggleTheme'

const Badge = lazy(() => import('./badge/Badge'))
const Error = lazy(() => import('./error/Error'))
const InfoMessage = lazy(() => import('./infoMessage/InfoMessage'))
const LoadMore = lazy(() => import('./loadMore/LoadMore'))
const Input = lazy(() => import('./input/Input'))
const Textarea = lazy(() => import('./forms/textarea/Textarea'))
const ValidationMessage = lazy(() => import('./forms/errorMessage/ValidationMessage'))
const CustomDatePicker = lazy(() => import('./customDatePicker/CustomDatePicker'))
const BasicTable = lazy(() => import('./tables/BasicTable'))
const FileUploader = lazy(() => import('./forms/fileUploader/FileUploader'))
const Tab = lazy(() => import('./tab/Tab'))
const ChangePasswordForm = lazy(() => import('./forms/changePassword/ChangePasswordForm'))
const Toggle = lazy(() => import('./toggle/Toggle'))
const LoaderLine = lazy(() => import('./loaders/loaderLine/LoaderLine'))
const Dropdown = lazy(() => import('./dropdown/Dropdown'))
const Sort = lazy(() => import('./filters/sort/Sort'))
const Search = lazy(() => import('./filters/search/Search'))
const Checkbox = lazy(() => import('./checkbox/Checkbox'))
const Tooltip = lazy(() => import('./tooltip/Tooltip'))
const Select = lazy(() => import('./select/Select'))

export { AuthLayout, Badge, BasicTable, Button, Card, CardsSubstations, ChangePasswordForm, ChannelInfo, Checkbox, CustomAxisTickChart, CustomBarChartLabel, CustomDatePicker, CustomSlider, CustomTooltipChart, Dropdown, Error, FileUploader, Group, Icon, InfoMessage, Input, Layout, Loader, LoaderLine, LoadMore, Modal, NavBar, NumberRecords, Page, Pagination, ProtectedRoute, Router, Search, Select, SelectWrapper, SmallCard, Sort, Tab, Textarea, Toggle, ToggleTheme, Tooltip, ValidationMessage }
