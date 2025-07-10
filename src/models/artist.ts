import { ExternalUrls, Image } from "./commonType";

export interface Artist {
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  name?: string;
  type?: string;
  uri?: string;
}

export interface SeveralArtists {
  ids: string;
}

export interface SeveralArtistsResponse extends Artist {
  followers?: {
    href: string | null;
    total: number;
  };
  genres?: string[];
  popularity?: number;
  images?: Image[];
}

export interface SeveralArtistsApiResponse {
  artists: SeveralArtistsResponse[];
}
