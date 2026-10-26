from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework.test import APIClient

from pantry.models import PantryIngredient

from .models import Recipe, RecipeIngredient
from .serializers import RecipeSerializer


class MissingIngredientsTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='pantry-owner')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def create_recipe(self, user, title, ingredient_names):
        recipe = Recipe.objects.create(user=user, title=title)
        ingredients = [
            RecipeIngredient.objects.get_or_create(name=name)[0]
            for name in ingredient_names
        ]
        recipe.ingredients.set(ingredients)
        return recipe

    def get_missing_ingredients(self, recipe):
        return self.client.get(
            f'/api/recipes/{recipe.pk}/missing-ingredients/'
        )

    def test_user_has_all_recipe_ingredients(self):
        recipe = self.create_recipe(
            self.user,
            'Pancakes',
            ['Flour', 'Milk'],
        )
        PantryIngredient.objects.create(user=self.user, name='Flour')
        PantryIngredient.objects.create(user=self.user, name='Milk')

        response = self.get_missing_ingredients(recipe)

        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.data['can_make'])
        self.assertEqual(response.data['missing_ingredients'], [])

    def test_user_is_missing_one_recipe_ingredient(self):
        recipe = self.create_recipe(
            self.user,
            'Pancakes',
            ['Flour', 'Milk'],
        )
        PantryIngredient.objects.create(user=self.user, name='Flour')

        response = self.get_missing_ingredients(recipe)

        self.assertEqual(response.status_code, 200)
        self.assertFalse(response.data['can_make'])
        self.assertEqual(response.data['missing_ingredients'], ['milk'])

    def test_user_is_missing_every_recipe_ingredient(self):
        recipe = self.create_recipe(
            self.user,
            'Pancakes',
            ['Flour', 'Milk'],
        )

        response = self.get_missing_ingredients(recipe)

        self.assertEqual(response.status_code, 200)
        self.assertFalse(response.data['can_make'])
        self.assertEqual(
            response.data['missing_ingredients'],
            ['flour', 'milk'],
        )

    def test_user_cannot_request_another_users_recipe(self):
        another_user = User.objects.create_user(username='another-owner')
        recipe = self.create_recipe(
            another_user,
            'Pancakes',
            ['Flour', 'Milk'],
        )

        response = self.get_missing_ingredients(recipe)

        self.assertEqual(response.status_code, 404)


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
