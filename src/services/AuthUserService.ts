import axios from "axios";
/**
 * input with string
 * recover access token 
 * verify user exists in database
 * if exists generate new token
 * if not exists = input on database and generate new token
 * return token + infos user
 */

interface AccessTokenResponse {
    access_token: string
}

interface UserResponse {
    avatar_url: string,
    login: string,
    id: number,
    name: string
}

class AuthUserService {
    async exe(code: string) {

        const url = "https://github.com/login/oauth/access_token";

        const { data: AccessTokenResponse } = await axios.post<AccessTokenResponse>(url, null, {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            },
            headers: {
                "Accept": "application/json"
            }
        });

        const response = await axios.get<UserResponse>("https://api.github.com/user", {
            headers: {
                authorization: `Bearer ${AccessTokenResponse.access_token}`
            }
        });

        return response.data;
    }
}
export { AuthUserService }