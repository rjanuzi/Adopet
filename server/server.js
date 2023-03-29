import express from "express";
import url from "url";
import path from "path";

const PORT = process.env.PORT || 80;
const app = express();

const currentPath = url.fileURLToPath(import.meta.url);
const publicFolder = path.join(currentPath, "../..", "public");
app.use(express.static(publicFolder));

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.get("/listPets", (req, res) => {
  res.json([
    {
      name: "rubinho",
      animal: "papagaio",
    },
    {
      name: "lessie",
      animal: "dog",
    },
  ]);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
