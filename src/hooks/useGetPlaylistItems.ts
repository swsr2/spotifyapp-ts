import { useInfiniteQuery } from "@tanstack/react-query";
import { getPlaylistItems } from "../apis/playlistApi";
import { PAGE_LIMIT } from "../configs/commonConfig";

const useGetPlaylistItems = (params: { playlist_id: string }) => {
  return useInfiniteQuery({
    queryKey: ["playlist-items", params.playlist_id],
    queryFn: ({ pageParam = 0 }) =>
      getPlaylistItems({
        playlist_id: params.playlist_id,
        offset: pageParam,
        limit: PAGE_LIMIT,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const nextOffset = url.searchParams.get("offset");
        return nextOffset ? parseInt(nextOffset) : undefined;
      }
      return undefined;
    },
  });
};

export default useGetPlaylistItems;
