import { useQueries, useQuery } from "@tanstack/react-query";
import { getAlbumsByIds, getAlbumTracks } from "../apis/albumApi";
import useClientCredentialToken from "./useClientCredentialToken";

export const useAlbumsByIds = (ids: string[]) => {
  const token = useClientCredentialToken();
  return useQuery({
    queryKey: ["albums", ids],
    queryFn: () => getAlbumsByIds(ids, token!),
    enabled: ids.length > 0,
    staleTime: 1000 * 60 * 5,
  });
};

export const useMultipleAlbumTracks = (albumIds: string[]) => {
  const token = useClientCredentialToken();

  const results = useQueries({
    queries: albumIds.map((albumId) => ({
      queryKey: ["album-tracks", albumId],
      queryFn: () => getAlbumTracks(albumId, token!),
      enabled: !!token,
      staleTime: 1000 * 60 * 5,
    })),
  });

  return results;
};
