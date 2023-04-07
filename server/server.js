import express from "express";
import url from "url";
import path from "path";
import Pet from "./models/Pet.js";
import { petsCollection } from "./db/dbConnect.js";

const PORT = process.env.PORT || 80;
const app = express();

const currentPath = url.fileURLToPath(import.meta.url);
const publicFolder = path.join(currentPath, "../..", "public");
app.use(express.static(publicFolder));

/* Auto convert body to JSON */
app.use(express.json());

app.post("/pets", async (req, res) => {
  let result = await petsCollection.insertOne(req.body);
  res.send(result);
});

app.get("/pets", async (req, res) =>{
  let pets = await petsCollection.find({}).toArray();
  res.status(200).json(pets);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

