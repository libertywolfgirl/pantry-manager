import { useState } from "react";
import AddButton from "../features/pantry/components/AddButton";
import PantryList from "../features/pantry/components/PantryList";
import styles from "../styles/PantryPage.module.css";

export interface PantryIngredientType {
  id: number;
  name: string;
}

const PantryPage = () => {
  const [ingredients, setIngredients] = useState<PantryIngredientType[]>([]);

  return (
    <main className={styles["pantry-page"]}>
      <p className={styles["pantry-tagline"]}>KITCHEN INVENTORY</p>
      <h1 className={styles["pantry-heading"]}>My Pantry</h1>
      <p className={styles["pantry-description"]}>
        Keep track of the staples you have on hand, and make every meal a little
        easier.
      </p>
      <AddButton setIngredients={setIngredients} />
      <PantryList ingredients={ingredients} setIngredients={setIngredients} />
    </main>
  );
};

export default PantryPage;
