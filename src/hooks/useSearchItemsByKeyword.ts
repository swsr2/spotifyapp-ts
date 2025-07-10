import { useInfiniteQuery } from "@tanstack/react-query"
import searchItemsByKeyword from "../apis/sarchApi"
import { searchRequestParams } from "../models/search"
import useClientCredentialToken from "./useClientCredentialToken"

const useSearchItemsByKeyword = (params:searchRequestParams)=>{
    const clientCredentialToken = useClientCredentialToken()

    return useInfiniteQuery({
        queryKey:['search', params],
        queryFn: ({pageParam=0})=>{
            if(!clientCredentialToken) throw new Error("no token available")
            return searchItemsByKeyword(clientCredentialToken, {...params, offset:pageParam})
        },
        initialPageParam:0,
        getNextPageParam:(lastpage)=>{
            const nextPageUrl = lastpage.tracks?.next || lastpage.artists?.next || lastpage.albums?.next || lastpage.audiobooks?.next || lastpage.shows?.next || lastpage.playlists?.next || lastpage.episodes?.next

            if(nextPageUrl){
                const nextOffset = new URL(nextPageUrl).searchParams.get("offset")

                return nextOffset?parseInt(nextOffset):undefined
            }
            return undefined
        }
    }
    )
}

export default useSearchItemsByKeyword