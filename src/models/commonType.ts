
export interface ExternalUrls {
    spotify: string
}

export interface Image {
    url: string
    height: number | null
    width: number | null
}

export interface Restrictions {
    reason?: string
}

export interface Followers{
        href:string
        total:number
}

export interface Owner{
    external_urls?:ExternalUrls
    href?:string
    id?:string
    type?:string
    uri?:string
    display_name?:string | null
}