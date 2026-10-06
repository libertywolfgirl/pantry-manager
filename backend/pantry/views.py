from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import PantryIngredient
from .serializers import PantryIngredientSerializer

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def pantry_list_create(request):
    if request.method == 'GET':
        items = PantryIngredient.objects.filter(user=request.user)
        serializer = PantryIngredientSerializer(items, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = PantryIngredientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return None


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def pantry_detail_delete(request, pk):
    try:
        item = PantryIngredient.objects.get(pk=pk, user=request.user)
    except PantryIngredient.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return None
