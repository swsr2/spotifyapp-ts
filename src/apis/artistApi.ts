// import api from "../utils/api";
// // apis/artistApi.ts

// import {
//   SeveralArtistsApiResponse,
//   SeveralArtistsResponse,
// } from "../models/artist";

// export const getArtistsByIds = async (
//   ids: string[]
// ): Promise<SeveralArtistsResponse[]> => {
//   try {
//     const response = await api.get<SeveralArtistsApiResponse>("/artists", {
//       params: {
//         ids: ids.join(","),
//       },
//     });
//     return response.data.artists;
//   } catch (error) {
//     throw new Error("Failed to fetch artist information");
//   }
// };

// apis/artistApi.ts

// apis/artistApi.ts

import axios from "axios";
import { SPOTIFY_API_URL } from "../configs/commonConfig";
import {
  SeveralArtistsApiResponse,
  SeveralArtistsResponse,
} from "../models/artist";

export const getArtistsByIds = async (
  ids: string[],
  token: string
): Promise<SeveralArtistsResponse[]> => {
  try {
    const response = await axios.get<SeveralArtistsApiResponse>(
      `${SPOTIFY_API_URL}/artists`,
      {
        params: { ids: ids.join(",") },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.artists;
  } catch (error) {
    console.error("getArtistsByIds API Error:", error);
    throw new Error("Failed to fetch artist information");
  }
};
