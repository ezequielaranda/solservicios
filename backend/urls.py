"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
"""

from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from rest_framework.authtoken import views
from rest_framework.authtoken.views import obtain_auth_token

from .api.views import (
    MessageViewSet, ProductoActivoViewSet, ProductoViewSet,
    TipoProductoViewSet, UserViewSet, index_view,
    FamiliaProductoViewSet, ProveedorViewSet, FacturaCompraViewSet,
    FacturaCompraCreateViewSet, ItemsFacturaViewSet, ItemEntregaClienteViewSet,
    StockHistoricoProductoViewSet, ProductoStockViewSet, EntregaClienteViewSet,
    PrecioHistoricoProductoViewSet, ProductoPreciosViewSet,
    ClienteViewSet, PuntoLimpiezaClienteViewSet, ProductoReporteConsumoViewSet)

router = routers.DefaultRouter()
router.register('messages', MessageViewSet)
router.register('productos', ProductoViewSet)
router.register('productosActivos', ProductoActivoViewSet) 
router.register('tiposproducto', TipoProductoViewSet)
router.register('familiasproducto', FamiliaProductoViewSet)
router.register('usuarios', UserViewSet, basename='User')
router.register('proveedores', ProveedorViewSet)
router.register('facturasCompra', FacturaCompraViewSet)
router.register('facturasCompraCreate', FacturaCompraCreateViewSet)
router.register('itemsFacturaCompra', ItemsFacturaViewSet)
router.register('itemEntregaCliente', ItemEntregaClienteViewSet)
router.register('stockProductos', StockHistoricoProductoViewSet)
router.register('stockProductosConsulta', ProductoStockViewSet)
router.register('entregasCliente', EntregaClienteViewSet)
router.register('preciosHistoricos', PrecioHistoricoProductoViewSet)
router.register('preciosHistoricosProductos', ProductoPreciosViewSet)
router.register('clientes', ClienteViewSet)
router.register('puntosLimpiezaCliente', PuntoLimpiezaClienteViewSet, basename='PuntoLimpiezaCliente')
router.register('reporteEntregasAClientes', ProductoReporteConsumoViewSet, basename='Producto')

urlpatterns = [

    # http://localhost:8000/
    path('', index_view, name='index'),

    # http://localhost:8000/api/<router-viewsets>
    path('api/', include(router.urls)),

    path('api/auth/obtain_token/', obtain_auth_token),

    # http://localhost:8000/api/admin/
    path('api/admin/', admin.site.urls),
]

