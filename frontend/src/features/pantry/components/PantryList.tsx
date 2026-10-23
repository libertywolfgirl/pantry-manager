import { useEffect } from "react";
import client from "../../../api/client";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import styles from "../styles/PantryList.module.css";
import PantryIngredient from "./PantryIngredient";
import type {
  PantryIngredientType,
  PantryListProps,
} from "../../../types/pantryTypes";

const PantryList = ({ ingredients, setIngredients }: PantryListProps) => {
  const { user } = useAuth();
  const access = user?.access;

  useEffect(() => {
    if (!access) {
      return;
    }

    client
      .get<PantryIngredientType[]>("/api/pantry/", {
        headers: { Authorization: `Bearer ${access}` },
      })
      .then((response) => setIngredients(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [access, setIngredients]);

  return (
    <div className={styles["pantry-list"]}>
      <div className={styles["pantry-list-header"]}>
        <h2 className={styles["pantry-list-title"]}>INGREDIENTS</h2>
        <p>Your everyday essentials</p>
      </div>
      <div className={styles["pantry-list-items"]}>
        {ingredients.map((ingredient) => (
          <PantryIngredient
            key={ingredient.id}
            ingredient={ingredient}
            setIngredients={setIngredients}
          />
        ))}
      </div>
    </div>
  );
};

export default PantryList;
