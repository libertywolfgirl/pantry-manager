import axios from "axios";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import { FaPlus } from "react-icons/fa";
import styles from "../../../styles/AddButton.module.css";
import type { PantryIngredientType } from "../../../pages/PantryPage";
import { useState } from "react";
import Modal from "../../../components/Modal";
import AddIngredientForm from "./AddIngredientForm";

const AddButton = ({
  setIngredients,
}: {
  setIngredients: React.Dispatch<React.SetStateAction<PantryIngredientType[]>>;
}) => {
  const { user } = useAuth();
  const access = user?.access;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addIngredient = (formData: { name: string }) => {
    if (!access) {
      return;
    }

    axios
      .post<PantryIngredientType>(
        "http://localhost:8000/api/pantry/",
        formData,
        { headers: { Authorization: `Bearer ${access}` } },
      )
      .then((response) => {
        setIngredients((currentIngredients) => [
          ...currentIngredients,
          response.data,
        ]);
      })
      .catch((error) => console.error("Error adding Ingredient:", error))
      .finally(() => setIsModalOpen(false));
  };

  return (
    <div className="button-container">
      <button
        type="button"
        className={styles["add-button"]}
        onClick={() => setIsModalOpen(true)}
      >
        <span>
          <FaPlus />
        </span>
        <span>Add ingredient</span>
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Ingredient"
      >
        <AddIngredientForm
          onSubmit={addIngredient}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default AddButton;
