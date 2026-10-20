from django.urls import path
from recipes import views

urlpatterns = [
    path('', views.recipe_create, name='recipe-list-create'),
    path('<int:pk>/', views.recipe_update, name='recipe-update'),
]
