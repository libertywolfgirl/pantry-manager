from rest_framework import serializers
from .models import Recipe, RecipeIngredient

class RecipeSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Recipe
        fields = ['id', 'user', 'title', 'ingredients', 'created_at', 'updated_at']

class RecipeIngredientSerializer(serializers.ModelSerializer):
    recipe = serializers.ReadOnlyField(source='recipe.id')

    class Meta:
        model = RecipeIngredient
        fields = ['id', 'name']
