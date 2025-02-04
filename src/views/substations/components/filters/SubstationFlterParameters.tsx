import { useEffect, useMemo, useState, type FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import AsyncSelect from 'react-select'
import { Button, Error, Group, Icon } from '../../../../components'
import { EFilterParam } from '../../../../enums/filterParam.enums'
import { useChannelCategories, useChannelTypes, useDistricts, useHeadControllers, useObjectTypes, useTypesKp } from '../../../../hooks'
import { IPropsSubstationFlterParameters } from './substationFlterParameters.interface'

const SubstationFlterParameters: FC<IPropsSubstationFlterParameters> = ({ toggleModal }) => {
	const [searchParams, setSearchParams] = useSearchParams()
	const districtParam = searchParams.get(EFilterParam.district)
	const typeKpParam = searchParams.get(EFilterParam.typeKp)
	const headControllerParam = searchParams.get(EFilterParam.headController)
	const channelCategoryParam = searchParams.get(EFilterParam.channelCategory)
	const channelTypeParam = searchParams.get(EFilterParam.channelType)
	const objectTypeParam = searchParams.get(EFilterParam.objectType)
	const [district, setDistrict] = useState<string | null>()
	const [typeKp, setTypeKp] = useState<string | null>()
	const [headController, setHeadController] = useState<string | null>()
	const [channelCategory, setChannelCategory] = useState<string | null>()
	const [channelType, setChannelType] = useState<string | null>()
	const [objectType, setObjectType] = useState<string | null>()
	const { districts, isError: isErrorDistricts, error: errorDistricts, isLoading: isLoadingDistricts } = useDistricts({})
	const { typesKp, isError: isErrorTypeKp, error: errorTypeKp, isLoading: isLoadingTypeKp } = useTypesKp({})
	const { headControllers, isError: isErrorHeadController, error: errorHeadController, isLoading: isLoadingHeadController } = useHeadControllers({})
	const { data: typesChannel, isError: isErrorTypesChannel, error: errorTypesChannel, isLoading: isLoadingTypesChannel } = useChannelTypes({})
	const { data: channelCategories, isError: isErrorChannelCategories, error: errorChannelCategories, isLoading: isLoadingChannelCategories } = useChannelCategories({})
	const { data: objectTypes, isError: isErrorObjectTypes, error: errorObjectTypes, isLoading: isLoadingObjectTypes } = useObjectTypes({})

	useEffect(() => {
		setDistrict(districtParam)
		setTypeKp(typeKpParam)
		setHeadController(headControllerParam)
		setChannelCategory(channelCategoryParam)
		setChannelType(channelTypeParam)
		setObjectType(objectTypeParam)
	}, [typeKpParam, headControllerParam, districtParam, channelCategoryParam, channelTypeParam, objectTypeParam])

	const updateSearchParams = () => {
		district && searchParams.set(EFilterParam.district, district)
		typeKp && searchParams.set(EFilterParam.typeKp, typeKp)
		headController && searchParams.set(EFilterParam.headController, headController)
		channelCategory && searchParams.set(EFilterParam.channelCategory, channelCategory)
		channelType && searchParams.set(EFilterParam.channelType, channelType)
		objectType && searchParams.set(EFilterParam.objectType, objectType)
		setSearchParams(searchParams)
	}
	const applyFilters = () => {
		updateSearchParams()
		toggleModal()
	}
	const clearQueryParams = () => setSearchParams({})
	const errorMessage = useMemo(() => (isErrorTypeKp || isErrorHeadController || isErrorTypesChannel || isErrorDistricts || isErrorChannelCategories || isErrorObjectTypes) && <Error error={errorTypeKp! || errorHeadController! || errorTypesChannel! || errorDistricts! || errorChannelCategories! || errorObjectTypes!} />, [isErrorTypeKp, isErrorHeadController, isErrorTypesChannel, isErrorDistricts, isErrorChannelCategories, isErrorObjectTypes, errorTypeKp, errorHeadController, errorTypesChannel, errorDistricts, errorChannelCategories, errorObjectTypes])

	return (
		<div className='filters !h-[540px]'>
			{errorMessage}
			<Group className='!gap-4'>
				<Group>
					<AsyncSelect
						classNamePrefix='form__custom-select'
						options={districts?.data}
						value={district ? districts?.data.find(s => s.id === +district) : null}
						getOptionValue={option => option.id.toString()}
						getOptionLabel={option => option.name}
						onChange={option => setDistrict(option ? option.id.toString() : null)}
						isLoading={isLoadingDistricts}
						isDisabled={isErrorDistricts}
						placeholder="Выберите Район/ГП/УС..."
					/>
				</Group>
				<Group>
					<AsyncSelect
						classNamePrefix='form__custom-select'
						options={objectTypes?.data}
						value={objectType ? objectTypes?.data.find(ot => ot.id === +objectType) : null}
						getOptionValue={option => option.id.toString()}
						getOptionLabel={option => option.name}
						onChange={option => setObjectType(option ? option.id.toString() : null)}
						isLoading={isLoadingObjectTypes}
						isDisabled={isErrorObjectTypes}
						placeholder="Выберите тип объекта..."
					/>
				</Group>
				<Group>
					<AsyncSelect
						classNamePrefix='form__custom-select'
						options={typesKp?.data}
						value={typeKp ? typesKp?.data.find(s => s.id === +typeKp) : null}
						getOptionValue={option => option.id.toString()}
						getOptionLabel={option => option.name}
						onChange={option => setTypeKp(option ? option.id.toString() : null)}
						isLoading={isLoadingTypeKp}
						isDisabled={isErrorTypeKp}
						placeholder="Выберите тип КП..."
					/>
				</Group>
				<Group>
					<AsyncSelect
						classNamePrefix='form__custom-select'
						options={headControllers?.data}
						value={headController ? headControllers?.data.find(s => s.id === +headController) : null}
						getOptionValue={option => option.id.toString()}
						getOptionLabel={option => option.name}
						onChange={option => setHeadController(option ? option.id.toString() : null)}
						isLoading={isLoadingHeadController}
						isDisabled={isErrorHeadController}
						placeholder="Выберите тип головного контроллера..."
					/>
				</Group>
				<Group>
					<AsyncSelect
						classNamePrefix='form__custom-select'
						options={channelCategories?.data}
						value={channelCategory ? channelCategories?.data.find(c => c.id === +channelCategory) : null}
						getOptionValue={option => option.id.toString()}
						getOptionLabel={option => option.name}
						onChange={option => setChannelCategory(option ? option.id.toString() : null)}
						isLoading={isLoadingChannelCategories}
						isDisabled={isErrorChannelCategories}
						placeholder="Выберите категорию канал..."
					/>
				</Group>
				<Group>
					<AsyncSelect
						classNamePrefix='form__custom-select'
						options={typesChannel?.data}
						value={channelType ? typesChannel?.data.find(c => c.id === +channelType) : null}
						getOptionValue={option => option.id.toString()}
						getOptionLabel={option => option.name}
						onChange={option => setChannelType(option ? option.id.toString() : null)}
						isLoading={isLoadingTypesChannel}
						isDisabled={isErrorTypesChannel}
						placeholder="Выберите тип канал..."
					/>
				</Group>
			</Group>
			<Group className='!flex-row justify-center'>
				<Button className='mBtn_outline-green' onClick={applyFilters}>
					<Icon id='filter-add' />
					Применить фильтры
				</Button>
				<Button onClick={clearQueryParams}>
					<Icon id='filter-remove' />
					Очистить фильтры
				</Button>
			</Group>
		</div >
	)
}

export default SubstationFlterParameters
