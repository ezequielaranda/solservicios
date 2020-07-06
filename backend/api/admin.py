from django.contrib import admin

from .models import Empresa, Estado, PrecioHistoricoProducto, ItemEntregaCliente, EntregaCliente, Cliente, Producto, Proveedor, TipoProducto, FamiliaProducto, StockHistoricoProducto, PuntoLimpiezaCliente, FacturaCompra, ItemsFactura, Usuario, Accion, AccionesRealizadasUsuario

admin.site.register(Producto)
admin.site.register(Proveedor)
admin.site.register(TipoProducto)
admin.site.register(Estado)
admin.site.register(Empresa)
admin.site.register(FamiliaProducto)
admin.site.register(StockHistoricoProducto)
admin.site.register(PuntoLimpiezaCliente)
admin.site.register(Cliente)
admin.site.register(EntregaCliente)
admin.site.register(FacturaCompra)
admin.site.register(ItemsFactura)
admin.site.register(Usuario)
admin.site.register(Accion)
admin.site.register(AccionesRealizadasUsuario)
admin.site.register(ItemEntregaCliente)
admin.site.register(PrecioHistoricoProducto)
