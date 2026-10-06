import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../features/auth/hooks/useAuth";

interface PantryIngredient {
  id: number;
  name: string;
}

const PantryPage = () => {
  const { user } = useAuth();
  const [ingredients, setIngredients] = useState<PantryIngredient[]>([]);
  const access = user?.access;

  useEffect(() => {
    if (!access) {
      return;
    }

    axios
      .get<PantryIngredient[]>("http://localhost:8000/api/pantry/", {
        headers: { Authorization: `Bearer ${access}` },
      })
      .then((response) => setIngredients(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [access]);

  const addIngredient = () => {
    if (!access) {
      return;
    }

    axios
      .post<PantryIngredient>(
        "http://localhost:8000/api/pantry/",
        { name: "New Ingredient" },
        { headers: { Authorization: `Bearer ${access}` } },
      )
      .then((response) => {
        setIngredients((currentIngredients) => [
          ...currentIngredients,
          response.data,
        ]);
      })
      .catch((error) => console.error("Error adding Ingredient:", error));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Django + React Decoupled App</h1>
      <button onClick={addIngredient} disabled={!access}>
        Add Quick Ingredient
      </button>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PantryPage;
