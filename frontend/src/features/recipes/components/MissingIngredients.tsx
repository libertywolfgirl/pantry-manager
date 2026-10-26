import { useState } from "react";
import client from "../../../api/client";
import type {
  MissingIngredientsProps,
  MissingIngredientsResponse,
} from "../../../types/recipesTypes";
import styles from "../styles/MissingIngredients.module.css";

const MissingIngredients = ({ user, recipe }: MissingIngredientsProps) => {
  const [result, setResult] = useState<MissingIngredientsResponse | null>(null);

  const handleMissingIngredients = () => {
    if (!user?.access) {
      console.error("Cannot check missing ingredients without signing in.");
      return;
    }

    client
      .get<MissingIngredientsResponse>(
        `/api/recipes/${recipe}/missing-ingredients/`,
        {
          headers: { Authorization: `Bearer ${user.access}` },
        },
      )
      .then((response) => setResult(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  return (
    <div className={styles.container}>
      <button
        className={styles["missing-ingredients-button"]}
        type="button"
        onClick={handleMissingIngredients}
      >
        Can I make this recipe?
      </button>
      {result && (
        <div className={styles.response} role="status">
          <p>
            {result.can_make
              ? "You have all the ingredients for this recipe."
              : "You are missing ingredients for this recipe."}
          </p>
          {result.missing_ingredients.length > 0 && (
            <ul>
              {result.missing_ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default MissingIngredients;
