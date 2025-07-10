import { ApiResponse } from "./apiResponse";
import { Artist } from "./artist";
import { ExternalUrls, Image, Restrictions } from "./commonType";
import { Track } from "./track";

export interface GetNewReleasesResponse {
  albums: ApiResponse<SimpleAlbum>;
}

export interface SimpleAlbum {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions?: Restrictions;
  type: string;
  uri: string;
  artists: Artist[];
}

export interface getAlbumsRequest {
  ids: string;
  market?: string;
}

export interface FullAlbum extends SimpleAlbum {
  tracks: ApiResponse<Track>;
  copyrights: {
    text: string;
    type: string;
  }[];
  external_ids: ExternalUrls;
  genres: string[];
  label: string;
  popularity: number;
}

export interface GetAlbumsResponse {
  albums: FullAlbum[];
}

export interface AlbumTracksResponse extends ApiResponse<Track> {}
