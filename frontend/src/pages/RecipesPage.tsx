import { useState } from "react";
import AddRecipeButton from "../features/recipes/components/AddRecipeButton";
import RecipeList from "../features/recipes/components/RecipeList";
import styles from "../features/recipes/styles/RecipesPage.module.css";
import type { RecipeType } from "../types/recipesTypes";
import RecipeIcon from "../components/icons/RecipeIcon";

const RecipesPage = () => {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);

  return (
    <main className={styles["recipe-page"]}>
      <span
        className={`${styles["recipe-card__icon-box"]} ${styles["recipe-card__icon-box--main"]}`}
      >
        <span className={styles["recipe-card__icon-wrapper"]}>
          <RecipeIcon />
        </span>
      </span>
      <p className={styles["recipe-tagline"]}>RECIPES</p>
      <h1 className={styles["recipe-heading"]}>All my available recipes</h1>
      <p className={styles["recipe-description"]}>
        Here you can find all your recipes. You can add new recipes, view
        existing ones, and manage your collection of recipes. Each recipe
        includes a title and a list of ingredients. Use the "Add Recipe" button
        to create a new recipe, and click on any recipe to view its details or
        remove it from your collection.
      </p>
      <AddRecipeButton setRecipes={setRecipes} />
      <RecipeList recipes={recipes} setRecipes={setRecipes} />
    </main>
  );
};

export default RecipesPage;
