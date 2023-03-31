"""linkloop URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urlsds import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urlsds'))
"""
from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path(r'api/v1/auth/', include(r'linkloop_app.urls.url_jwt')),
    path(r'api/v1/users/', include(r'linkloop_app.urls.url_user')),
    path(r'api/v1/videos/', include(r'linkloop_app.urls.url_video')),
    path(r'api/v1/profile/', include(r'linkloop_app.urls.url_profile')),
    path(r'api/v1/search/', include(r'linkloop_app.urls.url_search')),
    path(r'api/v1/quals/', include(r'linkloop_app.urls.url_quals')),
    path(r'api/v1/comms/', include(r'linkloop_app.urls.url_comms')),


    path('admin/', admin.site.urls),
]
