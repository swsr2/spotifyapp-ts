import { SimpleAlbum } from "./album"
import { ApiResponse } from "./apiResponse"
import { Artist } from "./artist"
import { SimplifiedPlaylist } from "./playlist"
import { Show, SimplifiedAudioBook, SimplifiedEpisode, Track } from "./track"

// enum - 서로 연관된 값들을 하나의 그룹으로 묶어 사용하기 좋음
export const enum SEARCH_TYPE {
    Track = "track",
    Album = "album",
    Playlist = "playlist",
    Show = "show",
    Episode = "episode",
    AudioBook = "audiobook",
    Artist = "artist",
}

export interface searchRequestParams {
    q: string
    // "album", "artist", "playlist", "track", "show", "episode", "audiobook" - enum 으로 만들자 
    type: SEARCH_TYPE[]
    market?:string
    limit?:number
    offset?:number
    include_external?:string

}

export interface SearchResponse{
    artists?:ApiResponse<Artist>
    albums?:ApiResponse<SimpleAlbum>
    tracks?:ApiResponse<Track>
    playlists?:ApiResponse<SimplifiedPlaylist>
    shows?:ApiResponse<Show>
    episodes?:ApiResponse<SimplifiedEpisode>
    audiobooks?:ApiResponse<SimplifiedAudioBook>
}