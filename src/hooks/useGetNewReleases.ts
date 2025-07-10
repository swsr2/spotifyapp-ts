import { useQuery } from "@tanstack/react-query";
import { getNewReleases } from "../apis/albumApi";
import useClientCredentialToken from "./useClientCredentialToken";

// 신규 앨범 가져오기
const useGetNewReleases = () => {
  const clientCredentialToken = useClientCredentialToken();
  return useQuery({
    queryKey: ["new-Releases"],
    queryFn: async () => {
      if (!clientCredentialToken) {
        throw new Error("no token available");
      }
      return await getNewReleases(clientCredentialToken);
    },
    enabled: !!clientCredentialToken,
  });
};

export default useGetNewReleases;
