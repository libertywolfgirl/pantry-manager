import type { AuthUserType } from "./authTypes";

export interface RecipeType {
  id: number;
  title: string;
  ingredients: { name: string }[];
}

export interface AddRecipeButtonProps {
  setRecipes: React.Dispatch<React.SetStateAction<RecipeType[]>>;
}

export interface RecipeFormData {
  title: string;
  ingredients: { name: string }[];
}

export interface AddRecipeFormProps {
  onSubmit: (formData: RecipeFormData) => void;
  onCancel: () => void;
  initialData?: RecipeFormData;
  submitLabel?: string;
  isSubmitting?: boolean;
}

export interface RecipeProps {
  recipe: RecipeType;
  setRecipes: React.Dispatch<React.SetStateAction<RecipeType[]>>;
}

export interface RecipeCardProps {
  recipe: RecipeType;
  onRecipeUpdated: (recipe: RecipeType) => void;
}

export interface RecipeListProps {
  recipes: RecipeType[];
  setRecipes: React.Dispatch<React.SetStateAction<RecipeType[]>>;
}

export interface MissingIngredientsProps {
  user: AuthUserType | null;
  recipe: number;
}

export interface MissingIngredientsResponse {
  can_make: boolean;
  missing_ingredients: string[];
}
