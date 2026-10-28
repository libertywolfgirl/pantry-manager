import { useState } from "react";
import styles from "../../../styles/Modal.module.css";
import type {
  AddRecipeFormProps,
  RecipeFormData,
} from "../../../types/recipesTypes";

const AddRecipeForm = ({
  onSubmit,
  onCancel,
  initialData = { title: "", ingredients: [{ name: "" }] },
  submitLabel = "Submit",
  isSubmitting = false,
}: AddRecipeFormProps) => {
  const [formData, setFormData] = useState<RecipeFormData>(initialData);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleIngredientChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.map((ingredient, ingredientIndex) =>
        ingredientIndex === index ? { name: value } : ingredient,
      ),
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ingredients = formData.ingredients.flatMap(({ name }) =>
      name
        .split(",")
        .map((ingredient) => ingredient.trim())
        .filter(Boolean)
        .map((ingredient) => ({ name: ingredient })),
    );

    if (ingredients.length === 0) {
      return;
    }

    onSubmit({ ...formData, ingredients });
  };

  return (
    <form onSubmit={handleSubmit} className={styles["modal-form"]}>
      <div className={styles["form-group"]}>
        <label className={styles.label} htmlFor="title">
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleTitleChange}
          required
        />
      </div>
      <div className={styles["form-group"]}>
        <label className={styles.label} htmlFor="ingredients">
          Ingredients:
        </label>
        <div className={styles["input-container"]}>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index}>
              <input
                type="text"
                id={`ingredients-${index}`}
                name={`ingredients-${index}`}
                aria-label={`Ingredient ${index + 1}`}
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                required
              />
              {formData.ingredients.length > 1 && (
                <button
                  type="button"
                  className={styles["btn-tertiary"]}
                  aria-label={`Remove ingredient ${index + 1}`}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      ingredients: prev.ingredients.filter(
                        (_, ingredientIndex) => ingredientIndex !== index,
                      ),
                    }))
                  }
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className={styles["btn-tertiary"]}
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                ingredients: [...prev.ingredients, { name: "" }],
              }))
            }
          >
            Add ingredient
          </button>
        </div>
      </div>
      <div className={styles["modal-actions"]}>
        <button
          type="button"
          className={styles["btn-secondary"]}
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={styles["btn-primary"]}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default AddRecipeForm;
