import {useMutation, useQuery} from "@tanstack/react-query";
import {Mutation, Query} from "@/feature";
import {approveSwMileageTokenRequest, getSwMileageTokenListRequest} from "@/feature/types/swMileageTokens.request";
import {approveSwMileageTokenResponse, getSwMileageTokenListResponse} from "@/feature/types/swMileageTokens.response";
import {approveSwMileageTokenAPI, getSwMileageTokenListAPI} from "@/feature/api/swMileageTokens.api";
import useStudentStore from "@/store/global/useStudentStore";
import {caver} from "@/App";
import useSwMileageTokenStore from "@/store/global/useSwMileageTokenStore";

const useGetSwMileageTokenList: Query<getSwMileageTokenListRequest, getSwMileageTokenListResponse> = (args) => {
  const  {getStudent} = useStudentStore(state => state)
  const {setKip7, setSwMileageToken} = useSwMileageTokenStore(state => state)

  return useQuery({
    queryKey: ['get-sw-mileage-token-list'],
    queryFn: async() => {
      const result = await getSwMileageTokenListAPI(args)
      const activateToken = result.find(el => el.is_activated === 1);
      if(!activateToken){
        return result
      }
      setSwMileageToken(activateToken)
      setKip7(caver.kct.kip7.create(activateToken.contract_address))
      return result
    },
    enabled: getStudent().student_id !== ''
  })
}

const useApproval: Mutation<approveSwMileageTokenRequest, approveSwMileageTokenResponse> = (args) => {
  const {onSuccessFn, onErrorFn} = args
  return useMutation({
    mutationFn: async(data) => {
      return await approveSwMileageTokenAPI(data)
    },
    ...(onSuccessFn && {onSuccess: (res: approveSwMileageTokenResponse) => onSuccessFn(res)}),
    ...(onErrorFn && {onError: (res) => onErrorFn(res)})
  })
}


export {
  useGetSwMileageTokenList,
  useApproval
}
