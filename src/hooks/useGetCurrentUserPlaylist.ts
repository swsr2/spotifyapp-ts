import { useInfiniteQuery } from "@tanstack/react-query"
import { getCurrentUserPlaylistRequest } from "../models/playlist"
import { getCurrentUserPlaylist } from "../apis/playlistApi"


const useGetCurrentUserPlaylist =({limit,offset}:getCurrentUserPlaylistRequest)=>{
    return useInfiniteQuery({
        queryKey:['current-user-playlists'],
        queryFn:({pageParam = 0 })=>{
            return getCurrentUserPlaylist({limit, offset:pageParam})
        },
        initialPageParam:0,
        getNextPageParam:(lastPage)=>{
            if(lastPage.next){
                const url = new URL(lastPage.next)
                const nextOffset = url.searchParams.get("offset")
                return nextOffset ? parseInt(nextOffset): undefined
            }
            return undefined
        }
    })
}
export default useGetCurrentUserPlaylist