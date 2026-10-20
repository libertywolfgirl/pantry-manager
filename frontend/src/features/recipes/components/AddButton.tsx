import axios from "axios";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import { FaPlus } from "react-icons/fa";
import styles from "../../../styles/AddButton.module.css";
import type { RecipeType } from "../../../pages/RecipesPage";
import { useState } from "react";
import Modal from "../../../components/Modal";
import AddRecipeForm from "./AddRecipeForm";

const AddButton = ({
  setRecipes,
}: {
  setRecipes: React.Dispatch<React.SetStateAction<RecipeType[]>>;
}) => {
  const { user } = useAuth();
  const access = user?.access;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addRecipe = (formData: { title: string, ingredients: { name: string }[] }) => {
    if (!access) {
      return;
    }

    axios
      .post<RecipeType>(
        "http://localhost:8000/api/recipes/",
        formData,
        { headers: { Authorization: `Bearer ${access}` } },
      )
      .then((response) => {
        setRecipes((currentRecipes) => [
          ...currentRecipes,
          response.data,
        ]);
      })
      .catch((error) => console.error("Error adding Recipe:", error))
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
        <span>Add Recipe</span>
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Recipe"
      >
        <AddRecipeForm
          onSubmit={addRecipe}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default AddButton;
