from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenBlacklistView,
)
from ..views.view_google_sign_up_in_ import get_google_client_id

urlpatterns = [
    path(r'token/', TokenObtainPairView.as_view()),
    path(r'token/refresh/', TokenRefreshView.as_view()),
    path(r'token/blacklist/', TokenBlacklistView.as_view(), name='token_blacklist'),
    path(r'google_client_id/', get_google_client_id, name='google_client_id')
]