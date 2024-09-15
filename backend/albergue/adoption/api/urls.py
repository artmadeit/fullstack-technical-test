from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, AdoptionViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'', AdoptionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]