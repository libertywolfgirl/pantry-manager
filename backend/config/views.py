from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def dashboard(request):
    return Response({
        "message": "Welcome to the Django + React Decoupled API!"
    })
