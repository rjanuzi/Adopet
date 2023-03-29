import express from "express";
import url from "url";
import path from "path";
import Pet from "./models/Pet.js";

const PORT = process.env.PORT || 80;
const app = express();

const currentPath = url.fileURLToPath(import.meta.url);
const publicFolder = path.join(currentPath, "../..", "public");
app.use(express.static(publicFolder));

/* Auto convert body to JSON */
app.use(express.json());

app.post("/pet", (req, res) => {
  console.log(new Pet(req.body));
  res.send("OK");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
