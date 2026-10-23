import { useState } from "react";
import client from "../../../api/client";
import { useAuth } from "../../auth/hooks/useAuth";
import AddButton from "../../../components/AddButton";
import AddIngredientForm from "./AddIngredientForm";
import type {
  AddIngredientButtonProps,
  PantryIngredientType,
} from "../../../types/pantryTypes";

const AddIngredientButton = ({ setIngredients }: AddIngredientButtonProps) => {
  const { user } = useAuth();
  const access = user?.access;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addIngredient = (formData: { name: string }) => {
    if (!access) {
      return;
    }

    client
      .post<PantryIngredientType>("/api/pantry/", formData, {
        headers: { Authorization: `Bearer ${access}` },
      })
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
    <AddButton
      handleClick={addIngredient}
      name="ingredient"
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      FormComponent={AddIngredientForm}
    />
  );
};

export default AddIngredientButton;
