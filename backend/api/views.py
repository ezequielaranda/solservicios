import datetime

from django.contrib.auth.models import User
from django.db.models import Count, Prefetch, Sum
from django.views.decorators.cache import never_cache
from django.views.generic import TemplateView
from rest_framework import generics, permissions, viewsets
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response

from .models import (Estado, Cliente, EntregaCliente, FacturaCompra, FamiliaProducto,
                     ItemEntregaCliente, ItemsFactura, Message,
                     PrecioHistoricoProducto, Producto, Proveedor,
                     PuntoLimpiezaCliente, StockHistoricoProducto,
                     TipoProducto)
from .serializers import (
    MessageSerializer, PrecioHistoricoProductoSerializer, ProductoSerializer, EntregaClienteSerializer,
    StockHistoricoProductoSerializer, UserSerializer, ProductoStockSerializer, ProductoPreciosSerializer,
    EstadoSerializer, TipoProductoSerializer, FamiliaProductoSerializer, ClienteSerializer, PuntoLimpiezaClienteSerializer,
    ProductoReporteConsumoSerializer, ProveedorSerializer, FacturaCompraSerializer, FacturaCompraCreateSerializer,
    ItemEntregaClienteSerializer, ItemsFacturaSerializer)


class DistinctSum(Sum):
    function = "SUM"
    template = "%(function)s(DISTINCT %(expressions)s)"

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

class PrecioHistoricoProductoViewSet(viewsets.ModelViewSet):
    queryset = PrecioHistoricoProducto.objects.all()
    serializer_class = PrecioHistoricoProductoSerializer

class EntregaClienteViewSet(viewsets.ModelViewSet):
    queryset = EntregaCliente.objects.all()
    serializer_class = EntregaClienteSerializer

class StockHistoricoProductoViewSet(viewsets.ModelViewSet):
    queryset = StockHistoricoProducto.objects.all()
    serializer_class = StockHistoricoProductoSerializer

class ProductoStockViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.filter(stocks__estacion_kanban__startswith='ST_', stocks__estado='0'
                              ).annotate(total_stock=Sum('stocks__cantidad'))
    serializer_class = ProductoStockSerializer

class ProductoPreciosViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all().filter(estado__codigo="ACTIVO")
    serializer_class = ProductoPreciosSerializer

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

class ProductoActivoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all().filter(estado__codigo="ACTIVO")
    serializer_class = ProductoSerializer

class TipoProductoViewSet(viewsets.ModelViewSet):
    queryset = TipoProducto.objects.all()
    serializer_class = TipoProductoSerializer

class EstadoViewSet(viewsets.ModelViewSet):
    queryset = Estado.objects.all()
    serializer_class = EstadoSerializer

class FamiliaProductoViewSet(viewsets.ModelViewSet):
    queryset = FamiliaProducto.objects.all()
    serializer_class = FamiliaProductoSerializer 

class ClienteViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAdminUser,)
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer

class PuntoLimpiezaClienteViewSet(viewsets.ModelViewSet):
    serializer_class = PuntoLimpiezaClienteSerializer
    def get_queryset(self):
        queryset = PuntoLimpiezaCliente.objects.all()
        cliente = self.request.query_params.get('cliente', None)
        if cliente is not None:
            queryset = queryset.filter(cliente=cliente)
        return queryset

class ProductoReporteConsumoViewSet(viewsets.ModelViewSet):
    serializer_class = ProductoReporteConsumoSerializer
    def get_queryset(self):
        
        fechaDesdeSource = datetime.date(2005, 1, 30)
        fechaHastaSource = datetime.date(2030, 1, 30)
        fechaDesde = self.request.query_params.get('fechaDesde', fechaDesdeSource)
        fechaHasta = self.request.query_params.get('fechaHasta', fechaHastaSource)
        
        queryset = Producto.objects.filter(productosEntrega__esEntrega=True, 
        productosEntrega__entregaCliente__fecha_entrega__gte=fechaDesde,
        productosEntrega__entregaCliente__fecha_entrega__lte=fechaHasta )
        
        cliente = self.request.query_params.get('cliente', None)
        if cliente is not None:
            queryset = Producto.objects.filter(productosEntrega__esEntrega=True, 
                productosEntrega__entregaCliente__punto_limpieza_cliente=cliente,
                productosEntrega__entregaCliente__fecha_entrega__gte=fechaDesde,
                productosEntrega__entregaCliente__fecha_entrega__lte=fechaHasta )
        queryset = queryset.annotate(total_entregado=DistinctSum('productosEntrega__cantidad'))
        
        return queryset

class ProveedorViewSet(viewsets.ModelViewSet):
    queryset = Proveedor.objects.all()
    serializer_class = ProveedorSerializer

class FacturaCompraViewSet(viewsets.ModelViewSet):
    queryset = FacturaCompra.objects.all()
    serializer_class = FacturaCompraSerializer

class FacturaCompraCreateViewSet(viewsets.ModelViewSet):
    queryset = FacturaCompra.objects.all()
    serializer_class = FacturaCompraCreateSerializer

class ItemsFacturaViewSet(viewsets.ModelViewSet):
    queryset = ItemsFactura.objects.all()
    serializer_class = ItemsFacturaSerializer

class ItemEntregaClienteViewSet(viewsets.ModelViewSet):
    queryset = ItemEntregaCliente.objects.all()
    serializer_class = ItemEntregaClienteSerializer