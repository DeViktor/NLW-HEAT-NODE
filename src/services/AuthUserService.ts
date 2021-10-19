import axios from "axios";
/**
 * input with string
 * recover access token 
 * verify user exists in database
 * if exists generate new token
 * if not exists = input on database and generate new token
 * return token + infos user
 */

class AuthUserService {
    async exe(code: string) {
        const url = "https://github.com/login/oauth/acess_token";

        const response = await axios.post(url, null, {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            },
            headers: {
                "Accept": "application/json"
            }
        })
        return response.data;
    }
}
export { AuthUserService };