from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from .views import ProductViewSet
from .views import register_user

router = DefaultRouter()
router.register(r'products', ProductViewSet)

urlpatterns = [
    path('', include(router.urls)),         # /api/products/
    path('login/', obtain_auth_token),      # /api/login/
    path('register/', register_user),
]
