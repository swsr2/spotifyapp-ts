import { User } from "../models/user"
import api from "../utils/api"

export const getCurrentUserProfile=async():Promise<User>=>{
    try {

        const response = await api.get(`/me`)
        return response.data
    } catch (error) {
        throw new Error("Failed to get current user profile")
    }
}

