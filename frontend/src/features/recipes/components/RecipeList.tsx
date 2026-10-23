import { useEffect } from "react";
import client from "../../../api/client";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import styles from "../styles/RecipeList.module.css";
import Recipe from "./Recipe";
import type { RecipeListProps, RecipeType } from "../../../types/recipesTypes";

const RecipeList = ({ recipes, setRecipes }: RecipeListProps) => {
  const { user } = useAuth();
  const access = user?.access;

  useEffect(() => {
    if (!access) {
      return;
    }

    client
      .get<RecipeType[]>("/api/recipes/", {
        headers: { Authorization: `Bearer ${access}` },
      })
      .then((response) => setRecipes(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [access, setRecipes]);

  return (
    <div className={styles["recipe-list"]}>
      <h2 className={styles["recipe-list-title"]}>All Recipes</h2>
      <div className={styles["recipe-list-items"]}>
        {recipes.map((recipe) => (
          <Recipe key={recipe.id} recipe={recipe} setRecipes={setRecipes} />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
