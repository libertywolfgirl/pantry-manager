import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoTrashOutline } from "react-icons/io5";
import { FaPencilAlt } from "react-icons/fa";
import Modal from "../../../components/Modal";
import { useAuth } from "../../auth/hooks/useAuth";
import type { RecipeType } from "../../../pages/RecipesPage";
import styles from "../../../styles/RecipeCard.module.css";
import AddRecipeForm from "./AddRecipeForm";

const RecipeCard = ({
  recipe,
  onRecipeUpdated,
}: {
  recipe: RecipeType;
  onRecipeUpdated: (recipe: RecipeType) => void;
}) => {
  const { title, ingredients } = recipe;
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const updateRecipe = async (formData: {
    title: string;
    ingredients: { name: string }[];
  }) => {
    if (!user?.access) {
      setActionError("You must be signed in to modify this recipe.");
      return;
    }

    setIsSaving(true);
    setActionError(null);

    try {
      const response = await axios.patch<RecipeType>(
        `http://localhost:8000/api/recipes/${recipe.id}/`,
        formData,
        { headers: { Authorization: `Bearer ${user.access}` } },
      );
      onRecipeUpdated(response.data);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating recipe:", error);
      setActionError("Unable to update this recipe. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteRecipe = async () => {
    if (!user?.access) {
      setActionError("You must be signed in to delete this recipe.");
      return;
    }

    setIsDeleting(true);
    setActionError(null);

    try {
      await axios.delete(
        `http://localhost:8000/api/recipes/${recipe.id}/`,
        { headers: { Authorization: `Bearer ${user.access}` } },
      );
      void navigate("/recipes");
    } catch (error) {
      console.error("Error deleting recipe:", error);
      setActionError("Unable to delete this recipe. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className={styles["recipe-card"]}>
        <div className={styles.title}>
          <p>TODAY'S RECIPE</p>
          <h1>{title}</h1>
          <button
            type="button"
            className={styles["custom-button"]}
            onClick={() => {
              setActionError(null);
              setIsEditModalOpen(true);
            }}
          >
            <span>
              <FaPencilAlt />
            </span>{" "}
            Modify Recipe
          </button>
        </div>
        <div className={styles["ingredients-container"]}>
          <div className={styles.ingredients}>
            <p>WHAT YOU'LL NEED</p>
            <div className={styles["ingredients-header"]}>
              <h2>Ingredients:</h2>
              <p>{ingredients.length} items</p>
            </div>
            <ol>
              {ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient.name}</li>
              ))}
            </ol>
          </div>
          <button
            type="button"
            className={styles["custom-button"]}
            onClick={() => void deleteRecipe()}
            disabled={isDeleting}
          >
            <span>
              <IoTrashOutline />
            </span>{" "}
            {isDeleting ? "Deleting..." : "Delete recipe"}
          </button>
        </div>
      </div>
      {actionError && <p role="alert">{actionError}</p>}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Modify Recipe"
      >
        <AddRecipeForm
          initialData={{
            title: recipe.title,
            ingredients: recipe.ingredients.map(({ name }) => ({ name })),
          }}
          onSubmit={(formData) => void updateRecipe(formData)}
          onCancel={() => setIsEditModalOpen(false)}
          submitLabel="Save changes"
          isSubmitting={isSaving}
        />
      </Modal>
    </>
  );
};

export default RecipeCard;
