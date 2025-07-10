import axios from "axios";
import { SPOTIFY_API_URL } from "../configs/commonConfig";
import {
  AlbumTracksResponse,
  GetAlbumsResponse,
  GetNewReleasesResponse,
} from "../models/album";
import api from "../utils/api";

export const getNewReleases = async (
  clientCredentialToken: string
): Promise<GetNewReleasesResponse> => {
  try {
    const response = await axios.get(
      `${SPOTIFY_API_URL}/browse/new-releases?limit=12`,
      {
        headers: {
          Authorization: `Bearer ${clientCredentialToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("fail to fetch new releases");
  }
};

export const getAlbumsByIds = async (
  ids: string[],
  token: string
): Promise<GetAlbumsResponse> => {
  try {
    const response = await api.get(`${SPOTIFY_API_URL}/albums`, {
      params: {
        ids: ids.join(","),
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "getAlbumsByIds API Error:",
      error.response?.data || error.message
    );
    throw new Error("Failed to fetch albums by ids");
  }
};

