import axios from "axios"
import { SPOTIFY_API_URL } from "../configs/commonConfig"
import { searchRequestParams, SearchResponse } from "../models/search"

const searchItemsByKeyword = async(token:string, params:searchRequestParams):Promise<SearchResponse> =>{
    try {
        const searchParams = new URLSearchParams()
        // 필수값 추가 
        searchParams.append("q", params.q)
        searchParams.append("type", params.type.join(","))

        if(params.market) searchParams.append("market", params.market)
        if(params.limit) searchParams.append("limit", params.limit.toString())
        if(params.offset) searchParams.append("offset", params.offset.toString())
        if(params.include_external) searchParams.append("include_external", params.include_external)
        
        const response = await axios.get(`${SPOTIFY_API_URL}/search?${searchParams.toString()}`, {
            headers:{
                Authorization:`Bearer ${token}`,
                "Content-Type":"application/json",
            }
        })
        return response.data
    } catch (error) {
        throw new Error("fail to search by keyword")
    }
}

export default searchItemsByKeyword