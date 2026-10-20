import { useState } from "react";
import AddButton from "../features/recipes/components/AddButton";
import RecipeList from "../features/recipes/components/RecipeList";
import styles from "../styles/RecipesPage.module.css";

export interface RecipeType {
  id: number;
  title: string;
  ingredients: { name: string }[];
}

const RecipesPage = () => {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);

  return (
    <div className={styles["recipe-page"]}>
      <p>
        <a href="/">Dashboard</a>
      </p>
      <p className={styles["recipe-tagline"]}>RECIPES</p>
      <h1 className={styles["recipe-heading"]}>All my available recipes</h1>
      <p className={styles["recipe-description"]}>
        Here you can find all your recipes. You can add new recipes, view
        existing ones, and manage your collection of recipes. Each recipe
        includes a title and a list of ingredients. Use the "Add Recipe" button
        to create a new recipe, and click on any recipe to view its details or
        remove it from your collection.
      </p>
      <AddButton setRecipes={setRecipes} />
      <RecipeList recipes={recipes} setRecipes={setRecipes} />
    </div>
  );
};

export default RecipesPage;
