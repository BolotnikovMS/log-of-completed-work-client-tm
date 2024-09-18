import { useQuery } from "@tanstack/react-query"
import { IQueryParams } from "../../interfaces"
import { CompletedWorkService } from "../../services/completed-work/completed-work.service"

export const useDownloadExcelCompletedWork = ({ page, limit, substation, executor, dateStart, dateEnd }: IQueryParams) => {
  const { error, isError, isFetching, refetch } = useQuery({
    queryKey: ['downloadExcelCompletesWork'],
    queryFn: () => CompletedWorkService.downloadExcel({ page, limit, substation, executor, dateStart, dateEnd }),
    enabled: false,
  })

  return { error, isError, isFetching, refetch }
}
