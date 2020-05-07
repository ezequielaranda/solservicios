from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache
from rest_framework import viewsets, generics, permissions

from django.db.models import Prefetch, Sum, Count
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser 
from django.contrib.auth.models import User

import datetime

from .models import Message, PrecioHistoricoProducto, ItemEntregaCliente, EntregaCliente, ItemsFactura, Producto, TipoProducto, StockHistoricoProducto, Cliente, PuntoLimpiezaCliente, Proveedor, FamiliaProducto, FacturaCompra, ItemsFactura
from .serializers import MessageSerializer, UserSerializer, PrecioHistoricoProductoSerializer, ProductoSerializer

# Serve Vue Application
index_view = never_cache(TemplateView.as_view(template_name='index.html'))


class MessageViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows messages to be viewed or edited.
    """
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    def get_queryset(self):
        queryset = User.objects.all()
        username = self.request.query_params.get('username', None)
        if username is not None:
            queryset = queryset.filter(username=username)
        return queryset

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

