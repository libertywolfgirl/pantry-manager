export interface PantryIngredientType {
  id: number;
  name: string;
}

export interface AddIngredientButtonProps {
  setIngredients: React.Dispatch<React.SetStateAction<PantryIngredientType[]>>;
}

export interface AddIngredientFormProps {
  onSubmit: (formData: { name: string }) => void;
  onCancel: () => void;
}

export interface PantryIngredientProps {
  ingredient: PantryIngredientType;
  setIngredients: React.Dispatch<React.SetStateAction<PantryIngredientType[]>>;
}

export interface PantryListProps {
  ingredients: PantryIngredientType[];
  setIngredients: React.Dispatch<React.SetStateAction<PantryIngredientType[]>>;
}
