def get_missing_ingredients(recipe, user):
    recipe_ingredients = {
        ingredient.name.strip().lower()
        for ingredient in recipe.ingredients.all()
    }

    pantry_ingredients = {
        ingredient.name.strip().lower()
        for ingredient in user.pantry_ingredients.all()
    }

    return recipe_ingredients - pantry_ingredients
