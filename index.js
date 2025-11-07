import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { recettes } from "./datas/recettes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3310;

app.use(cors());
app.use(express.json());

app.use("/assets", express.static(path.join(__dirname, "/assets")));

/*
app.get("/recettes/:1,2,3", (req, res) => {
  res.json(recettes)
  return recettes.categorie
})
*/
app.get("/entree", (req, res) => {
  res.json(recettes.filter((rec) => {
    return rec.categorie === "Entrée"
  }));
});

app.get("/plat", (req, res) => {
  res.json(recettes.filter((rec) => {
    return rec.categorie === "Plat"
  }));
}); 

app.get("/dessert", (req, res) => {
  res.json(recettes.filter((rec) => {
    return rec.categorie === "Dessert"
  }));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
