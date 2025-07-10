import { useMutation, useQueryClient } from "@tanstack/react-query"
import { exchangeToken } from "../apis/authApi"
import { ExchangeTokenResponse } from "../models/auth"
import api from "../utils/api"


const useExchangeToken = () => {
    const queryClient = useQueryClient()
    // 토큰 교환 - mutation 사용 (응답값, 에러값, 변수값)
    return useMutation<ExchangeTokenResponse, Error, {code:string, codeVerifier:string}>({
        mutationFn: ({code, codeVerifier})=> exchangeToken(code, codeVerifier),
        onSuccess: (data)=> {
            localStorage.setItem('access_token', data.access_token);
            api.defaults.headers.common["Authorization"] = `Bearer ${data.access_token}`;
            window.location.href = "/"
            queryClient.invalidateQueries({
                queryKey:["currentUserProfile"] // 쿼리키 무효화(캐시 삭제)
            })
        },
    })
}

export default useExchangeToken;