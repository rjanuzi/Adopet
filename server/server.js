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
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.post("/pets/:petId?", async (req, res) => {
  const petId = req.params.petId;
  let result;
  console.log(req.body);
  if (petId) {
    result = await petsCollection.updateOne({ _id: new ObjectId(petId) }, {$set:req.body});
  } else {
    result = await petsCollection.insertOne(req.body);
  }
  
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

app.delete("/pets/:petId?", async (req, res) => {
  const petId = req.params.petId;
  let result = await petsCollection.deleteOne({ _id: new ObjectId(petId)});
  res.send({ result: result.acknowledged });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

