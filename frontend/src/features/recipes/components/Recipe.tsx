import client from "../../../api/client";
import { IoTrashOutline } from "react-icons/io5";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Recipe.module.css";
import type { RecipeProps } from "../../../types/recipesTypes";

const Recipe = ({ recipe, setRecipes }: RecipeProps) => {
  const { user } = useAuth();
  const access = user?.access;
  const navigate = useNavigate();

  const removeRecipe = () => {
    if (!access) {
      return;
    }

    setRecipes((currentRecipes) =>
      currentRecipes.filter((item) => item.id !== recipe.id),
    );

    client
      .delete(`/api/recipes/${recipe.id}/`, {
        headers: { Authorization: `Bearer ${access}` },
      })
      .catch((error) => {
        console.error("Error removing recipe:", error);
        setRecipes((currentRecipes) =>
          currentRecipes.some((item) => item.id === recipe.id)
            ? currentRecipes
            : [...currentRecipes, recipe],
        );
      });
  };

  const handleRecipeClick = () => {
    void navigate(`/recipes/${recipe.id}`, { state: { recipe } });
  };

  return (
    <div className={styles["recipe-container"]}>
      <button className={styles["recipe-btn"]} onClick={handleRecipeClick}>
        {recipe.title}
      </button>
      <button
        type="button"
        aria-label={`Remove ${recipe.title}`}
        className={styles["remove-btn"]}
        onClick={removeRecipe}
      >
        <span>
          <IoTrashOutline />
        </span>
      </button>
    </div>
  );
};

export default Recipe;
