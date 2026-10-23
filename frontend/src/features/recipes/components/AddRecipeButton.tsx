import client from "../../../api/client";
import { useAuth } from "../../auth/hooks/useAuth";
import { useState } from "react";
import AddButton from "../../../components/AddButton";
import AddRecipeForm from "./AddRecipeForm";
import type {
  AddRecipeButtonProps,
  RecipeType,
} from "../../../types/recipesTypes";

const AddRecipeButton = ({ setRecipes }: AddRecipeButtonProps) => {
  const { user } = useAuth();
  const access = user?.access;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addRecipe = (formData: {
    title: string;
    ingredients: { name: string }[];
  }) => {
    if (!access) {
      return;
    }

    client
      .post<RecipeType>("/api/recipes/", formData, {
        headers: { Authorization: `Bearer ${access}` },
      })
      .then((response) => {
        setRecipes((currentRecipes) => [...currentRecipes, response.data]);
      })
      .catch((error) => console.error("Error adding Recipe:", error))
      .finally(() => setIsModalOpen(false));
  };

  return (
    <AddButton
      handleClick={addRecipe}
      name="recipe"
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      FormComponent={AddRecipeForm}
    />
  );
};

export default AddRecipeButton;
