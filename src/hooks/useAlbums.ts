import { useQuery } from "@tanstack/react-query";
import { getAlbumsByIds } from "../apis/albumApi";
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
