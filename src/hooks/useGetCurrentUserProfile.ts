import { useQuery } from "@tanstack/react-query";
import { getCurrentUserProfile } from "../apis/userApi";


// 로그인 성공했을때 사용 
const useGetCurrentUserProfile = () => {
    const accessToken = localStorage.getItem('access_token')
   
    return useQuery({
        queryKey: ['currentUserProfile'],
        queryFn: () => getCurrentUserProfile(),
        enabled: !!accessToken,
        staleTime: 1000*60*5,
        retry: false,        
    })
}

export default useGetCurrentUserProfile;