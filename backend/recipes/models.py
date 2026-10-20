from django.contrib.auth.models import User
from django.db import models

class RecipeIngredient(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["name"],
                name="unique_recipe_ingredient"
            )
        ]

class Recipe(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="recipes"
    )

    title = models.CharField(max_length=100)

    ingredients = models.ManyToManyField(
        RecipeIngredient,
        related_name="ingredients"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "title"],
                name="unique_user_recipe"
            )
        ]
