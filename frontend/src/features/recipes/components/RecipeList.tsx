import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import styles from "../../../styles/RecipeList.module.css";
import Recipe from "./Recipe";
import type { RecipeType } from "../../../pages/RecipesPage";

const RecipeList = ({
  recipes,
  setRecipes,
}: {
  recipes: RecipeType[];
  setRecipes: React.Dispatch<React.SetStateAction<RecipeType[]>>;
}) => {
  const { user } = useAuth();
  const access = user?.access;

  useEffect(() => {
    if (!access) {
      return;
    }

    axios
      .get<RecipeType[]>("http://localhost:8000/api/recipes/", {
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
