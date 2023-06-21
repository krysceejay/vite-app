import { useQuery } from "@tanstack/react-query"
import { getPaymentByTransfer } from "../api/payments"
import { isAxiosError } from "axios"
import { toast } from "react-toastify"
import { ITransfer } from "../api/types/transfer-types"

export const usePaymentByTransfer = (data: ITransfer | undefined) => {
    return useQuery({
        queryKey: ['payments', data?.guid],
        queryFn: () => getPaymentByTransfer(data?.guid),
        enabled: !!data,
        onError: (err) => {
            if (isAxiosError(err)) {
                toast.error(err.response?.data.message)
            } else {
                console.log('unexpected', err)
            }
        }
      })
  }