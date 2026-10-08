import axios from "axios";
import { IoTrashOutline } from "react-icons/io5";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import styles from "../../../styles/PantryIngredient.module.css";
import type { PantryIngredientType } from "../../../pages/PantryPage";

const PantryIngredient = ({
  ingredient,
  setIngredients,
}: {
  ingredient: PantryIngredientType;
  setIngredients: React.Dispatch<React.SetStateAction<PantryIngredientType[]>>;
}) => {
  const { user } = useAuth();
  const access = user?.access;

  const removeIngredient = () => {
    if (!access) {
      return;
    }

    setIngredients((currentIngredients) =>
      currentIngredients.filter((item) => item.id !== ingredient.id),
    );

    axios
      .delete(`http://localhost:8000/api/pantry/${ingredient.id}/`, {
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
