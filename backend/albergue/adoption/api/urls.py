from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, AdoptionViewSet

router = DefaultRouter()
router.register(r'', AdoptionViewSet)
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
]