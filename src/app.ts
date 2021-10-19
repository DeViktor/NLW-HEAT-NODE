import express, { request } from "express";

const app = express();

app.get('/github', (request, response) => {
    response.redirect(`https://github.com/login/oauth/autorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
})

app.listen(4000, () => console.log(`:rocket: server is running on port 4000`));