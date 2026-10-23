import { useState } from "react";
import CheckIcon from "../../../components/icons/CheckIcon";
import AddButton from "../../recipes/components/AddButton";
import type { RecipeType } from "../../../pages/RecipesPage";
import styles from "../styles/DescriptionCard.module.css";

const DescriptionCard = () => {
  const [, setRecipes] = useState<RecipeType[]>([]);

  return (
    <aside className={styles.container}>
      <span className={styles["icon-container"]}>
        <span className={styles["icon-wrapper"]}>
          <CheckIcon />
        </span>
      </span>
      <div className={styles.text}>
        <h2 className={styles.header}>Make every grocery trip count</h2>
        <p className={styles.description}>
          Add your favorite recipes and keep your pantry up to date. Stocked
          will compare the two and tell you exactly which ingredients you are
          missing before you start cooking.
        </p>
      </div>
      <AddButton setRecipes={setRecipes} />
    </aside>
  );
};

export default DescriptionCard;
