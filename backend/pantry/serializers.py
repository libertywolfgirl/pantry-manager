from rest_framework import serializers
from .models import PantryIngredient

class PantryIngredientSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = PantryIngredient
        fields = ['id', 'user', 'name', 'created_at']
