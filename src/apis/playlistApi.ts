import {
  AddTracksToPlaylistRequest,
  AddTracksToPlaylistResponse,
  CreatePlaylistRequest,
  getCurrentUserPlaylistRequest,
  getCurrentUserPlaylistResponse,
  GetPlaylistItemsRequest,
  GetPlaylistItemsResponse,
  GetPlaylistRequest,
  Playlist,
} from "../models/playlist";
import api from "../utils/api";
import { getClientCredentialToken } from "./authApi";

export const getCurrentUserPlaylist = async ({
  limit,
  offset,
}: getCurrentUserPlaylistRequest): Promise<getCurrentUserPlaylistResponse> => {
  try {
    const response = await api.get("/me/playlists", {
      params: { limit, offset },
    });
    return response.data;
  } catch (error) {
    throw new Error("fail to fetch current user playlist");
  }
};

export const getPlaylist = async (
  params: GetPlaylistRequest
): Promise<Playlist> => {
  try {
    const response = await api.get(`/playlists/${params.playlist_id}`, {
      params,
    });
    return response.data;
  } catch (error) {
    throw new Error("fail to fetch playlist detail");
  }
};

export const getPlaylistItems = async (
  params: GetPlaylistItemsRequest
): Promise<GetPlaylistItemsResponse> => {
  const token = await getClientCredentialToken();
  const { playlist_id, ...queryParams } = params;

  try {
    const response = await api.get(`playlists/${params.playlist_id}/tracks`, {
      params: queryParams,
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("getPlaylistItems API Error:", error);
    throw new Error("fail to fetch playlist items");
  }
};

export const createPlaylist = async (
  user_id: string,
  params: CreatePlaylistRequest
): Promise<Playlist> => {
  try {
    const { name, playlistPublic, collaborative, description } = params;
    const response = await api.post(`/users/${user_id}/playlists`, {
      name,
      public: playlistPublic,
      collaborative,
      description,
    });
    return response.data;
  } catch (error) {
    throw new Error("fail to create playlist");
  }
};

export const addItemsPlaylist = async (
  playlist_id: string,
  params: AddTracksToPlaylistRequest
): Promise<AddTracksToPlaylistResponse> => {
  try {
    const response = await api.post(`/playlists/${playlist_id}/tracks`, params);
    return response.data;
  } catch (error) {
    throw new Error("fail to add playlist");
  }
};
