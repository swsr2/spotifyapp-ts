import axios from "axios"
import { CLIENT_SECRET, CLIENT_ID } from "../configs/authConfig"
import { ClientCredentialTokenResponse, ExchangeTokenResponse } from "../models/auth"
import { REDIRECT_URI } from "../configs/commonConfig"


const encodeBase64 = (data: string): string => {
    if(typeof window !== "undefined") {
        return window.btoa(data)
    }   
    return Buffer.from(data).toString("base64")
}

// 스포티파이 클라이언트 토큰 가져오기 
export const getClientCredentialToken = async (): Promise<ClientCredentialTokenResponse> => {
    try {
        const body = new URLSearchParams({
            grant_type: "client_credentials",
        })
        const response = await axios.post("https://accounts.spotify.com/api/token", body, {
            headers: {
                Authorization: `Basic ${encodeBase64(CLIENT_ID + ":" + CLIENT_SECRET)}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
        return response.data
    } catch (error) {
        throw new Error("Failed to get client credential Token")
    }
   
}

export const exchangeToken = async (code: string, codeVerifier: string):Promise<ExchangeTokenResponse> => {
    try {
        const url = "https://accounts.spotify.com/api/token";
        if(!CLIENT_ID || !REDIRECT_URI) {
            throw new Error("Client ID or Redirect URI is not set")
        }
        const body = new URLSearchParams({
            client_id: CLIENT_ID,
            redirect_uri: REDIRECT_URI,
            grant_type: "authorization_code",
            code,
            code_verifier: codeVerifier,
        })
        const response = await axios.post(url, body, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
        return response.data
    } catch (error) {
        throw new Error("Failed to exchange token")
    }
}

