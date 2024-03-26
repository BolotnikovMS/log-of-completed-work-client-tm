import { Button } from './button/Button'
import { Card } from './cards/card/Card'
import { Header } from './header/Header'
import { Layout } from './layout/Layout'
import { Loader } from './loader/Loader'
import { Modal } from './modal/Modal'
import { NavBar } from './navBar/NavBar'
import { Page } from './page/Page'
import { ProtectedRoute } from './protectedRoute/ProtectedRoute'
import { Router } from './routing/Router'
import { SmallCard } from './cards/small-card/SmallCard'
import { lazy } from 'react'

const Badge = lazy(() => import('./badge/Badge'))
const Error = lazy(() => import('./error/Error'))
const InfoMessage = lazy(() => import('./infoMessage/InfoMessage'))
const LoadMore = lazy(() => import('./loadMore/LoadMore'))
const Input = lazy(() => import('./input/Input'))
const CustomInput = lazy(() => import('./forms/customInput/CustomInput'))
const Textarea = lazy(() => import('./forms/textarea/Textarea'))
const ValidationMessage = lazy(() => import('./forms/errorMessage/ValidationMessage'))
const FormGroup = lazy(() => import('./forms/formGroup/FormGroup'))
const ControlPanel = lazy(() => import('./controlPanel/ControlPanel'))

export { Badge, Button, Card, ControlPanel, CustomInput, Error, FormGroup, Header, InfoMessage, Input, Layout, Loader, LoadMore, Modal, NavBar, Page, ProtectedRoute, Router, SmallCard, Textarea, ValidationMessage }

