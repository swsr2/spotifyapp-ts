import { ApiResponse } from "./apiResponse"
import { Artist } from "./artist"
import { ExternalUrls, Followers, Image, Owner, Restrictions } from "./commonType"
import { Episode, Track } from "./track"

export interface getCurrentUserPlaylistRequest{
    limit?:number,
    offset?:number
}

// interface는 객체를 받아야함 
export type getCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylist>

export interface BasePlaylist {
    collaborative?:boolean
    description?:string | null 
    external_urls?: ExternalUrls
    href?:string
    id?:string
    images:Image[]
    name?:string
    owner: Owner
    public?:boolean
    snapshot_id?:string
    type?:"playlist"
    uri?:string
}

export interface SimplifiedPlaylist extends BasePlaylist{
    tracks?:{
        href?:string
        total?:number
    }
}
export interface GetPlaylistRequest {
    playlist_id:string
    market?:string
    fields?:string
    additional_types?:string
}

// tracks 복잡 구조 
export interface Playlist extends BasePlaylist{
    tracks: ApiResponse<PlaylistTrack>
    followers: Followers
}

export interface PlaylistTrack {
    added_at?: string | null
    added_by?:{
        external_url?:ExternalUrls
        href?: string
        id?: string
        type?: string
        uri?: string 
    } | null
    is_local?: boolean
    track: Track | Episode
}

export interface GetPlaylistItemsRequest extends GetPlaylistRequest{
    offset?:number
    limit?:number
}

export type GetPlaylistItemsResponse = ApiResponse<PlaylistTrack>

export interface CreatePlaylistRequest {
    name:string
    playlistPublic?:boolean
    collaborative?:boolean
    description?:string
}

export interface AddTracksToPlaylistRequest  {
    position?:number
    uris?:string[]
}

export interface AddTracksToPlaylistResponse {
    snapshot_id: string;
}