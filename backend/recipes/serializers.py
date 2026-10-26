from rest_framework import serializers
from .models import Recipe, RecipeIngredient
from .services import get_missing_ingredients


class RecipeIngredientSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=100, validators=[])

    class Meta:
        model = RecipeIngredient
        fields = ['id', 'name']

class RecipeSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    ingredients = RecipeIngredientSerializer(many=True)

    class Meta:
        model = Recipe
        fields = ['id', 'user', 'title', 'ingredients', 'created_at', 'updated_at']

    def create(self, validated_data):
        ingredients_data = validated_data.pop('ingredients')
        recipe = Recipe.objects.create(**validated_data)
        ingredients = [
            RecipeIngredient.objects.get_or_create(name=ingredient['name'])[0]
            for ingredient in ingredients_data
        ]
        recipe.ingredients.set(ingredients)
        return recipe

    def update(self, instance, validated_data):
        ingredients_data = validated_data.pop('ingredients', None)
        instance = super().update(instance, validated_data)
        if ingredients_data is not None:
            ingredients = [
                RecipeIngredient.objects.get_or_create(name=ingredient['name'])[0]
                for ingredient in ingredients_data
            ]
            instance.ingredients.set(ingredients)
        return instance
