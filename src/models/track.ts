import { SimpleAlbum } from "./album"
import { Artist } from "./artist"
import { ExternalUrls, Restrictions, Image } from "./commonType"

export interface Track {
    album?:SimpleAlbum
    artists?:Artist[]
    available_markets?:string[]
    disc_number?:number
    duration_ms?:number
    explicit?:boolean
    external_ids?:{
        isrc:string
        ean:string
        upc:string
    }
    external_urls?:ExternalUrls
    href?:string
    id?:string
    is_playable?:boolean
    linked_from?:Track
    restrictions?:Restrictions
    name?:string
    popularity?:number
    preview_url?:string | null 
    track_number?:number
    type?:"track"
    uri?:string
    is_local?:boolean
}

export interface Episode{
    description: string;
    html_description: string;
    duration_ms: number;
    explicit: boolean;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    is_externally_hosted: boolean;
    is_playable: boolean;
    languages:string[]
    name: string;
    release_date: string;
    release_date_precision:string
    resume_point:{
        fully_played:boolean
        resume_position_ms:number
    }
    show: Show;
    type: "episode";
    uri: string;
    restrictions: Restrictions
}

export type SimplifiedEpisode=Omit<Episode, 'Show'>

export interface Show {
    available_markets:string[]
    copyrights:{
        text?:string
        type?:string
    }
    description:string
    explicit:boolean
    html_description:string
    id: string;
    name: string;
    uri: string;
    href: string;
    publisher: string;
    type: "show";
    external_urls: ExternalUrls;
    images: Image[];
    languages:string[]
    media_type:string
    total_episodes:number
    is_externally_hosted:boolean
    
  }
  

  export interface SimplifiedAudioBook{
    author:{name:string}[]
    available_markets:string[]
    copyrights:{
        text?:string
        type?:string
    }
    description:string
    html_description:string
    edition?:string
    explicit:boolean
    external_urls:ExternalUrls
    href:string
    id:string
    images:Image[]
    languages:string[]
    media_type:string
    name:string
    narrators:{name:string}[]
    publisher:string
    type:"audiobook"
    uri:string
    total_chapters:number
  }