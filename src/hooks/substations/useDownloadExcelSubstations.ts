import { useQuery } from "@tanstack/react-query"
import { IQueryParams } from "../../interfaces"
import { SubstationService } from "../../services/substations/substation.service"

export const useDownloadExcelSubstations = ({ page, limit, typeKp, headController, mainChannel, backupChannel, district }: IQueryParams) => {
  const { error, isError, isFetching, refetch } = useQuery({
    queryKey: ['downloadExcelSubstations'],
    queryFn: () => SubstationService.downloadExcel({ page, limit, typeKp, headController, mainChannel, backupChannel, district }),
    enabled: false,
  })

  return { error, isError, isFetching, refetch }
}
