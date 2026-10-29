import client from "../api/client";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";
import RecipeCard from "../features/recipes/components/RecipeCard";
import type { RecipeType } from "../types/recipesTypes";
import MissingIngredients from "../features/recipes/components/MissingIngredients";

const isRecipe = (value: unknown): value is RecipeType => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Partial<RecipeType>;
  return (
    typeof candidate.id === "number" &&
    typeof candidate.title === "string" &&
    Array.isArray(candidate.ingredients)
  );
};

const RecipePage = () => {
  const { id } = useParams();
  const location = useLocation();
  const { user } = useAuth();
  const navigationState: unknown = location.state;
  const recipeFromNavigation =
    typeof navigationState === "object" &&
    navigationState !== null &&
    "recipe" in navigationState &&
    isRecipe(navigationState.recipe)
      ? navigationState.recipe
      : undefined;
  const [recipe, setRecipe] = useState<RecipeType | undefined>(
    recipeFromNavigation,
  );
  const [loading, setLoading] = useState(!recipeFromNavigation);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (recipeFromNavigation || !id || !user?.access) {
      return;
    }

    client
      .get<RecipeType>(`/api/recipes/${id}/`, {
        headers: { Authorization: `Bearer ${user.access}` },
      })
      .then((response) => setRecipe(response.data))
      .catch((requestError: unknown) => {
        console.error("Error fetching recipe:", requestError);
        setError("Unable to load this recipe.");
      })
      .finally(() => setLoading(false));
  }, [id, recipeFromNavigation, user?.access]);

  if (loading) {
    return <p>Loading recipe...</p>;
  }

  if (error || !recipe) {
    return <p>{error ?? "Recipe not found."}</p>;
  }

  return (
    <main>
      <title>Stocked - Recipe</title>
      <meta
        name="description"
        content="View the ingredients needed for your recipe. Find out if you have all the necessary ingredients in your pantry."
      />
      <RecipeCard recipe={recipe} onRecipeUpdated={setRecipe} />
      <MissingIngredients user={user} recipe={recipe.id} />
    </main>
  );
};

export default RecipePage;
