import { Ilog, IMeta } from '../interfaces'

export type TRespLogs = { meta: IMeta, data: TLogShort }

export type TLogShort = Omit<Ilog, 'errorType' | 'ipAddress' | 'model' | 'data' | 'changes'>
