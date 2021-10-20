import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";


import { router } from "./routes";

const app = express();

app.use(cors());

const serverHTTP = http.createServer(app);

const io = new Server(serverHTTP, {
    cors: {
        origin: "*"
    }
});

app.use(express.json());

app.use(router);

app.get('/github', (request, response) => {
    response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
});



app.get('/singin/callback', (request, response) => {
    const { code } = request.query;
    return response.json(code);
});

app.listen(4000, () => console.log(`server is running on port 4000`));