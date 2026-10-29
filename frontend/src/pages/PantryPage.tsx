import { useState } from "react";
import PantryList from "../features/pantry/components/PantryList";
import styles from "../features/pantry/styles/PantryPage.module.css";
import AddIngredientButton from "../features/pantry/components/AddIngredientButton";
import type { PantryIngredientType } from "../types/pantryTypes";
import PantryIcon from "../components/icons/PantryIcon";

const PantryPage = () => {
  const [ingredients, setIngredients] = useState<PantryIngredientType[]>([]);

  return (
    <main className={styles["pantry-page"]}>
      <title>Stocked - Pantry</title>
      <meta
        name="description"
        content="Keep track of all the ingredients in your pantry."
      />
      <span className={styles["pantry-icon-wrapper"]}>
        <PantryIcon />
      </span>
      <p className={styles["pantry-tagline"]}>KITCHEN INVENTORY</p>
      <h1 className={styles["pantry-heading"]}>My Pantry</h1>
      <p className={styles["pantry-description"]}>
        Keep track of the staples you have on hand, and make every meal a little
        easier.
      </p>
      <AddIngredientButton setIngredients={setIngredients} />
      <PantryList ingredients={ingredients} setIngredients={setIngredients} />
    </main>
  );
};

export default PantryPage;
