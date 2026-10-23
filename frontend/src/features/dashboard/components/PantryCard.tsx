import { useEffect, useState } from "react";
import ArrowIcon from "../../../components/icons/ArrowIcon";
import PantryIcon from "../../../components/icons/PantryIcon";
import { useAuth } from "../../auth/hooks/useAuth";
import styles from "../styles/PantryCard.module.css";
import client from "../../../api/client";
import type { PantryIngredientType } from "../../../types/pantryTypes";

const PantryCard = () => {
  const { user } = useAuth();
  const access = user?.access;
  const [ingredients, setIngredients] = useState<PantryIngredientType[]>([]);

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
    <a href="/pantry" className={styles["pantry-card"]}>
      <div className={styles["card-header"]}>
        <span className={styles["pantry-icon-wrapper"]}>
          <PantryIcon />
        </span>
        <span className={styles["arrow-icon-wrapper"]}>
          <ArrowIcon />
        </span>
      </div>
      <h2 className={styles["card-title"]}>My Pantry</h2>
      <p className={styles["card-description"]}>
        Add ingredients, track your staples, and see what is ready to use.
      </p>
      <div className={styles["card-footer"]}>
        <span className={styles["status-dot"]}></span>
        {ingredients.length
          ? `${ingredients.length === 1 ? "1 ingredient" : `${ingredients.length} ingredients`} stocked`
          : "No ingredients stocked"}
      </div>
    </a>
  );
};

export default PantryCard;
