import useGetCurrentUserProfile from "../../../hooks/useGetCurrentUserProfile";
import useCreatePlaylist from "../../../hooks/useCreatePlaylist";
import { getSpotifyAuthUrl } from "../../../utils/auth";

const useHandlePlaylistCreate = () => {
  const { data: user } = useGetCurrentUserProfile();
  const { mutate: createPlaylist } = useCreatePlaylist();

  const handleCreate = () => {
    if (user) {
      createPlaylist({ name: "내 플레이리스트" });
    } else {
      alert("로그인이 필요합니다.");
      getSpotifyAuthUrl();
    }
  };

  return { handleCreate };
};

export default useHandlePlaylistCreate;
