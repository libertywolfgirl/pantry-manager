from django.urls import path
from pantry import views

urlpatterns = [
    path('', views.pantry_list_create, name='pantry-list-create'),
    path('<int:pk>/', views.pantry_detail_delete, name='pantry-delete'),
]
