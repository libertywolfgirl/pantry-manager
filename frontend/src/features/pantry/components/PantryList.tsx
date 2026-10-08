import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import styles from "../../../styles/PantryList.module.css";
import PantryIngredient from "./PantryIngredient";
import type { PantryIngredientType } from "../../../pages/PantryPage";

const PantryList = ({ ingredients, setIngredients }: { ingredients: PantryIngredientType[]; setIngredients: React.Dispatch<React.SetStateAction<PantryIngredientType[]>> }) => {
  const { user } = useAuth();
  const access = user?.access;

  useEffect(() => {
    if (!access) {
      return;
    }

    axios
      .get<PantryIngredientType[]>("http://localhost:8000/api/pantry/", {
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
