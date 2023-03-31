import express from "express";
import url from "url";
import path from "path";
import Pet from "./models/Pet.js";

const pets = [];
const PORT = process.env.PORT || 80;
const app = express();

const currentPath = url.fileURLToPath(import.meta.url);
const publicFolder = path.join(currentPath, "../..", "public");
app.use(express.static(publicFolder));

/* Auto convert body to JSON */
app.use(express.json());

app.post("/pets", (req, res) => {
  pets.push(new Pet(req.body));
  res.send("OK");
});

app.get("/pets", (req, res) =>{
  res.status(200).json(pets);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

