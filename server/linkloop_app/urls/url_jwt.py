from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenBlacklistView,
)
urlpatterns = [
    path(r'token/', TokenObtainPairView.as_view()),
    path(r'token/refresh/', TokenRefreshView.as_view()),
    path(r'token/blacklist/', TokenBlacklistView.as_view(), name='token_blacklist'),
]