import "dotenv/config";
import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT ?? 3000;
const API_KEY = process.env.API_KEY;

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

app.get("/dinoname", async (request, response) => {
  const fetchApi = await fetch(
    "https://dinoipsum.com/api/?format=json&words=2&paragraphs=1"
  );
  const dinoNameResponse = await fetchApi.json();
  response.json(dinoNameResponse);
});

app.get("/dinoimage", async (request, response) => {
  const fetchApi = await fetch(
    "https://bing-image-search1.p.rapidapi.com/images/search?q=dinosaur&count=10",
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "bing-image-search1.p.rapidapi.com",
        "x-rapidapi-key": API_KEY,
      },
    }
  );
  const dinoImageResponse = await fetchApi.json();
  response.json(dinoImageResponse);
});
