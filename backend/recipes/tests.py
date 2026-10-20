from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework.test import APIClient

from .models import RecipeIngredient
from .serializers import RecipeSerializer


class RecipeSerializerTests(TestCase):
    def test_create_accepts_named_ingredients(self):
        user = User.objects.create_user(username='recipe-owner')
        serializer = RecipeSerializer(
            data={
                'title': 'Tomato soup',
                'ingredients': [
                    {'name': 'Tomato'},
                    {'name': 'Water'},
                ],
            }
        )

        self.assertTrue(serializer.is_valid(), serializer.errors)
        recipe = serializer.save(user=user)

        self.assertEqual(
            RecipeSerializer(recipe).data['ingredients'],
            [
                {'id': recipe.ingredients.get(name='Tomato').id, 'name': 'Tomato'},
                {'id': recipe.ingredients.get(name='Water').id, 'name': 'Water'},
            ],
        )
        self.assertEqual(RecipeIngredient.objects.count(), 2)

        second_serializer = RecipeSerializer(
            data={
                'title': 'Tomato water',
                'ingredients': [{'name': 'Tomato'}],
            }
        )
        self.assertTrue(second_serializer.is_valid(), second_serializer.errors)
        second_recipe = second_serializer.save(user=user)

        self.assertEqual(RecipeIngredient.objects.count(), 2)
        self.assertTrue(
            second_recipe.ingredients.filter(name='Tomato').exists()
        )

    def test_get_recipe_by_id_returns_recipe_data(self):
        user = User.objects.create_user(username='recipe-reader')
        serializer = RecipeSerializer(
            data={
                'title': 'Tomato soup',
                'ingredients': [{'name': 'Tomato'}],
            }
        )
        self.assertTrue(serializer.is_valid(), serializer.errors)
        recipe = serializer.save(user=user)

        client = APIClient()
        client.force_authenticate(user=user)
        response = client.get(f'/api/recipes/{recipe.id}/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['title'], 'Tomato soup')
        self.assertEqual(response.data['ingredients'][0]['name'], 'Tomato')
