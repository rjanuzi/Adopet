import express from "express";

const PORT = process.env.PORT || 80;

const app = express();

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
