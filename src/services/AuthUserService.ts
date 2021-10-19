import axios from "axios";
import prismaClient from "../prisma";
import { sign } from "jsonwebtoken"
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

        const { login, id, avatar_url, name } = response.data;

        let user = await prismaClient.user.findFirst({
            where: {
                github_id: id
            }
        })
        if (!user) {
            user = await prismaClient.user.create({
                data: {
                    github_id: id,
                    login,
                    avatar_url,
                    name
                }
            })
        }

        const token = sign({
            user: {
                name: user.name,
                avatar_url: user.avatar_url,
                login: user.login,
                github_id: user.github_id,
                id: user.id
            }
        },
            process.env.JWT_SECRET, {
            subject: user.id,
            expiresIn: "1d"
        }
        )

        return { token, user };
    }
}
export { AuthUserService }