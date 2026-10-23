import { useEffect, useState } from "react";
import ArrowIcon from "../../../components/icons/ArrowIcon";
import RecipeIcon from "../../../components/icons/RecipeIcon";
import { useAuth } from "../../auth/hooks/useAuth";
import styles from "../styles/RecipeCard.module.css";
import client from "../../../api/client";
import type { RecipeType } from "../../../types/recipesTypes";

const RecipeCard = () => {
  const { user } = useAuth();
  const access = user?.access;
  const [recipes, setRecipes] = useState<RecipeType[]>([]);

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
    <a href="/recipes" className={styles["recipe-card"]}>
      <div className={styles["recipe-card__bg-circle"]}></div>
      <div className={styles["recipe-card__header"]}>
        <span
          className={`${styles["recipe-card__icon-box"]} ${styles["recipe-card__icon-box--main"]}`}
        >
          <span className={styles["recipe-card__icon-wrapper"]}>
            <RecipeIcon />
          </span>
        </span>
        <span
          className={`${styles["recipe-card__icon-box"]} ${styles["recipe-card__icon-box--arrow"]}`}
        >
          <span className={styles["recipe-card__icon-wrapper-sm"]}>
            <ArrowIcon />
          </span>
        </span>
      </div>
      <h2 className={styles["recipe-card__title"]}>My Recipes</h2>
      <p className={styles["recipe-card__description"]}>
        Save favorite dishes and find the perfect meal for what you have.
      </p>
      <div className={styles["recipe-card__footer"]}>
        <span className={styles["recipe-card__dot"]}></span>
        {recipes.length
          ? `${recipes.length === 1 ? "1 recipe" : `${recipes.length} recipes`} saved`
          : "No recipes saved"}{" "}
      </div>
    </a>
  );
};

export default RecipeCard;
