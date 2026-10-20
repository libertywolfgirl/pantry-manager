import type { RecipeType } from "../../../pages/RecipesPage";

const RecipeCard = ({ recipe }: { recipe: RecipeType }) => {
  const { title, ingredients } = recipe;
  return (
    <div>
      <h1>{title}</h1>
      <div>
        <h2>Ingredients:</h2>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipeCard;
