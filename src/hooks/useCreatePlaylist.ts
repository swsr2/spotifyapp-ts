import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { createPlaylist } from "../apis/playlistApi";
import useGetCurrentUserProfile from "./useGetCurrentUserProfile";
import { CreatePlaylistRequest } from "../models/playlist";

const useCreatePlaylist = () => {
  const queryClient = useQueryClient();
  // user_id 가져오기
  const { data: user } = useGetCurrentUserProfile();
  // post - mutation
  return useMutation({
    mutationFn: (params: CreatePlaylistRequest) => {
      if (user?.id) {
        return createPlaylist(user.id, params);
      }
      return Promise.reject(new Error("user is not defined"));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user-playlists"] });
    },
  });
};

export default useCreatePlaylist;
