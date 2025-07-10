import { useQuery } from "@tanstack/react-query"
import { getClientCredentialToken } from "../apis/authApi"

// 스포티파이 클라이언트 토큰 가져오기 
const useClientCredentialToken = ():string | undefined => {
   const { data } = useQuery({
        queryKey: ["client-credential-token"],
        queryFn: getClientCredentialToken,
    })
    const clientCredentialToken =  data?.access_token
    return clientCredentialToken
}

export default useClientCredentialToken