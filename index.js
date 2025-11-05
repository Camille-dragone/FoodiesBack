import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { Recette } from "./datas/recette";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3310;

app.use(cors());
app.use(express.json());

app.use("/assets", express.static(path.join(__dirname, "/assets")));

app.get("/entrée", (req, res) => {
  res.json(Recette);
});

app.get("/plat", (req, res) => {
  res.json(Recette);
}); 

app.get("/dessert", (req, res) => {
  res.json(Recette);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
