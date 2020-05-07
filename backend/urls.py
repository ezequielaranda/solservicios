"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
"""

from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework.authtoken import views 
from rest_framework.authtoken.views import obtain_auth_token 

from .api.views import index_view, MessageViewSet, UserViewSet, ProductoViewSet

router = routers.DefaultRouter()
router.register('messages', MessageViewSet)
router.register('productos', ProductoViewSet)
router.register('usuarios', UserViewSet, basename='User')

urlpatterns = [

    # http://localhost:8000/
    path('', index_view, name='index'),

    # http://localhost:8000/api/<router-viewsets>
    path('api/', include(router.urls)),

    path('api/auth/obtain_token/', obtain_auth_token),

    # http://localhost:8000/api/admin/
    path('api/admin/', admin.site.urls),
]


