from rest_framework import viewsets
from albergue.adoption.models import CustomUser
from .serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        queryset = super().get_queryset()

        if self.action == "list":
            role = self.request.query_params.get("role")
            if role:
                return queryset.filter(role=role)

        return queryset