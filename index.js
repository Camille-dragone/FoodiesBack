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

app.get ("/recettes",(req,res) => { 
  return res.json(recettes)
})


app.get("/recettes/:idcategorie", (req, res) => {
  const id = parseInt(req.params.idcategorie);
  return res.json(recettes.filter(rec => rec.idcategorie === id));
});

app.get ("/ingredients",(req,res) => { 
  const allIngredients = [];
  recettes.forEach(recette => {
    recette.ingredients.forEach(ingredient => {
      allIngredients.push(ingredient)
    }) 
  }) 
  const uniqueIngredients = deduplicateIngredient(allIngredients)
  return res.json(uniqueIngredients)
})

function deduplicateIngredient (ingredients) {
  const uniqueIngredients = [];
  ingredients.forEach(ingredient => {
    if (!isIngredientInUniqueIngredients(uniqueIngredients, ingredient))
      uniqueIngredients.push(ingredient)
  });
  return uniqueIngredients;
}

function isIngredientInUniqueIngredients (uniqueIngredients, ingredient) {
  for (const uniqueIngredient of uniqueIngredients ){
    if (uniqueIngredient.nom === ingredient.nom)
      return true 
  }
  return false 
}



/*id n°1 => entrée / id n°2 =>plat / id n°3 => dessert 

/* utiliser req.body */
/* insérer avec le app.post*/
/* demander à Abdou si cette regarde n'est pas trop galère à utiliser côté front et comment / ce que l'on doit mettre en front : 
faut-il  mettre method : POST,  lui envoyer le lien 

*/
/*
app.post("/recherche", (req, res) => {
  const {ingredients} = req.body
  console.log(ingredients)

  if (!ingredients || ingredients.length === 0) {
    return res.status(404).json ("Aucune recettes trouvées")
  }

  const resultats = recettes.filter((rec) => {
    let nbCommun = 0;
    rec.ingredients.forEach(ingredientOfRecette => {
      const isIngredientInParam= isIngredientInUniqueIngredients(ingredients, ingredientOfRecette)
      if (isIngredientInParam)
        nbCommun++;
    }); return nbCommun >= 2;
  });
  const nomsRecettes = resultats.map ((rec) => rec.nom)

    /* 
    if (nbCommun >= 2)
      return true
    else 
      return false
      });
  res.json(resultats); */
/*
et là faire l'algo pour la correspondance ? faire un filter ? 
  faire en sorte de tout convertir en toLowerCase afin que le recherche ne soit pas sensible à la casse ? 
  lui envoyer le lien 

*/
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
