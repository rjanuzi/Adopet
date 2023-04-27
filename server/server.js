import express from "express";
import url from "url";
import path from "path";
import { petsCollection } from "./db/dbConnect.js";
import { ObjectId } from "mongodb";

const PORT = process.env.PORT || 80;
const app = express();

const currentPath = url.fileURLToPath(import.meta.url);
const publicFolder = path.join(currentPath, "../..", "public");
app.use(express.static(publicFolder));

/* Auto convert body to JSON */
app.use(express.json());

app.post("/pets:petId?", async (req, res) => {
  // TODO - Reimplementar para o Save
  let result = await petsCollection.insertOne(req.body);
  res.send({ result: result.acknowledged });
});

app.get("/pets/:petId?", async (req, res) => {
  const petId = req.params.petId;
  let pets;
  if (petId) {
    pets = await petsCollection.find({ _id: new ObjectId(petId) }).toArray();
    if (pets.length > 0) {
      pets = pets[0];
    }
  } else {
    pets = await petsCollection.find({}).toArray();
  }
  res.status(200).json(pets);
});

app.get("/createPet/:petId?", (req, res) => {
  res.sendFile(path.join(publicFolder, "createPet/createPet.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
