import "dotenv/config";
import express from "express";


const app = express();

app.use(express.json());



app.get('/github', (request, response) => {
    response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
});

app.get('/singin/callback', (request, response) => {
    const { code } = request.query;
    return response.json(code);
});

app.listen(4000, () => console.log(`:rocket: server is running on port 4000`));