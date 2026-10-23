import client from "../../../api/client";
import { IoTrashOutline } from "react-icons/io5";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import styles from "../styles/PantryIngredient.module.css";
import type { PantryIngredientProps } from "../../../types/pantryTypes";

const PantryIngredient = ({
  ingredient,
  setIngredients,
}: PantryIngredientProps) => {
  const { user } = useAuth();
  const access = user?.access;

  const removeIngredient = () => {
    if (!access) {
      return;
    }

    setIngredients((currentIngredients) =>
      currentIngredients.filter((item) => item.id !== ingredient.id),
    );

    client
      .delete(`/api/pantry/${ingredient.id}/`, {
        headers: { Authorization: `Bearer ${access}` },
      })
      .catch((error) => {
        console.error("Error removing ingredient:", error);
        setIngredients((currentIngredients) =>
          currentIngredients.some((item) => item.id === ingredient.id)
            ? currentIngredients
            : [...currentIngredients, ingredient],
        );
      });
  };

  return (
    <div className={styles["pantry-ingredient"]}>
      <div>{ingredient.name}</div>
      <button
        type="button"
        aria-label={`Remove ${ingredient.name}`}
        className={styles["remove-btn"]}
        onClick={removeIngredient}
      >
        <span>
          <IoTrashOutline />
        </span>
      </button>
    </div>
  );
};

export default PantryIngredient;
