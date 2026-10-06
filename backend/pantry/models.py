from django.contrib.auth.models import User
from django.db import models

class PantryIngredient(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="pantry_ingredients"
    )

    name = models.CharField(max_length=100)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "name"],
                name="unique_user_pantry_ingredient"
            )
        ]
