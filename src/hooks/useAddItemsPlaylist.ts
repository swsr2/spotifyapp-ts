import { useMutation } from "@tanstack/react-query";
import { addItemsPlaylist } from "../apis/playlistApi";
import {
  AddTracksToPlaylistRequest,
  AddTracksToPlaylistResponse,
} from "../models/playlist";

interface MutationParams {
  playlistId: string;
  params: AddTracksToPlaylistRequest;
}

const useAddItemsPlaylist = () => {
  return useMutation<AddTracksToPlaylistResponse, Error, MutationParams>({
    mutationFn: ({ playlistId, params }) =>
      addItemsPlaylist(playlistId, params),

    onSuccess: (data, variables) => {
      console.log("트랙 추가 성공:", data.snapshot_id);
    },
    onError: (error) => {
      console.error("트랙 추가 실패:", error.message);
    },
  });
};

export default useAddItemsPlaylist;
