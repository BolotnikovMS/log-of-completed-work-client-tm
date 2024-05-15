import { lazy } from 'react'
import { Button } from './button/Button'
import { Card } from './cards/card/Card'
import { SmallCard } from './cards/small-card/SmallCard'
import { SelectWrapper } from './customSelect/SelectWrapper'
import { Header } from './header/Header'
import { Layout } from './layout/Layout'
import { Loader } from './loader/Loader'
import { Modal } from './modal/Modal'
import { NavBar } from './navBar/NavBar'
import { Page } from './page/Page'
import { ProtectedRoute } from './protectedRoute/ProtectedRoute'
import { Router } from './routing/Router'

const Badge = lazy(() => import('./badge/Badge'))
const Error = lazy(() => import('./error/Error'))
const InfoMessage = lazy(() => import('./infoMessage/InfoMessage'))
const LoadMore = lazy(() => import('./loadMore/LoadMore'))
const Input = lazy(() => import('./input/Input'))
const CustomInput = lazy(() => import('./forms/customInput/CustomInput'))
const Textarea = lazy(() => import('./forms/textarea/Textarea'))
const ValidationMessage = lazy(() => import('./forms/errorMessage/ValidationMessage'))
const ControlPanel = lazy(() => import('./controlPanel/ControlPanel'))
const Group = lazy(() => import('./group/Group'))
const CustomDatePicker = lazy(() => import('./customDatePicker/CustomDatePicker'))
const BasicTable = lazy(() => import('./tables/BasicTable'))
const FileUploader = lazy(() => import('./forms/fileUploader/FileUploader'))

export { Badge, BasicTable, Button, Card, ControlPanel, CustomDatePicker, CustomInput, Error, FileUploader, Group, Header, InfoMessage, Input, Layout, Loader, LoadMore, Modal, NavBar, Page, ProtectedRoute, Router, SelectWrapper, SmallCard, Textarea, ValidationMessage }

