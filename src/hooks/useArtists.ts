// import { useQuery } from "@tanstack/react-query";
// import { getArtistsByIds } from "../apis/artistApi";

// export const useArtistsByIds = (ids: string[]) => {
//   return useQuery({
//     queryKey: ["artists", ids],
//     queryFn: () => getArtistsByIds(ids),
//     enabled: ids.length > 0,
//     retry: false,
//   });
// };

// apis/artistApi.ts

import { useQuery } from "@tanstack/react-query";
import { getArtistsByIds } from "../apis/artistApi";
import useClientCredentialToken from "./useClientCredentialToken";

export const useArtistsByIds = (ids: string[]) => {
  const token = useClientCredentialToken();
  return useQuery({
    queryKey: ["artists", ids],
    queryFn: () => getArtistsByIds(ids, token!),
    enabled: ids.length > 0,
    retry: false,
  });
};
