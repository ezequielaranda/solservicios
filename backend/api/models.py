from django.db import models
from rest_framework import serializers
from django.utils import timezone
from django.contrib.auth.models import User

class Message(models.Model):
    subject = models.CharField(max_length=200)
    body = models.TextField()


class EstadoProducto(models.Model):
    codigo = models.CharField(max_length=8, unique=True)
    descripcion = models.CharField(max_length=60)

    def __str__(self):
        return self.descripcion

class Cliente(models.Model):
    nombre_completo = models.CharField(max_length=50)
    domicilio = models.CharField(max_length=60)

    def __str__(self):
        return self.nombre_completo

class PuntoLimpiezaCliente(models.Model):
    nombre_completo = models.CharField(max_length=50)
    domicilio = models.CharField(max_length=60, null=True)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)

# Definición de la clase PROVEEDOR
class Proveedor(models.Model):
    nombre_completo = models.CharField(max_length=50)
    razon_social = models.CharField(max_length=60) 
    domicilio = models.CharField(max_length=70)
    ingresos_brutos = models.CharField(max_length=10)
    fecha_inicio_actividades = models.DateField(auto_now=False)
    CONDICION_IVA_CHOICES = (
            ('RI', 'Responsable Inscripto'),
            ('MO', 'Monotributista'),
            ('EX', 'Exento'),
            ('NR', 'No Responsable'),
            ('CF', 'Consumidor Final'),
    )
    condicionIVA = models.CharField(max_length=2,choices=CONDICION_IVA_CHOICES)
    cuit = models.CharField(max_length=11)

    def __str__(self):
        return self.nombre_completo

# Definición de la TIPOS de PRODUCTO
class TipoProducto(models.Model):
    descripcion = models.CharField(max_length=50)
    codigo = models.CharField(max_length=8, unique=True)
    def __str__(self):
        return self.descripcion

# Definición de las FAMILIAS de PRODUCTO
class FamiliaProducto(models.Model):
    descripcion = models.CharField(max_length=50)
    codigo = models.CharField(max_length=8, unique=True)
    def __str__(self):
        return self.descripcion

#Definición de la clase ACCION
class Accion(models.Model):
    nombre_completo = models.CharField(max_length=50)
    codigo_accion = models.CharField(max_length=8, unique=True)

# Definición de la clase PRODUCTO
class Producto(models.Model):
    nombre_completo = models.CharField(max_length=50)
    estado = models.ForeignKey(EstadoProducto, on_delete=models.SET_NULL, null=True)
    proveedor = models.ForeignKey(Proveedor, related_name='productos', on_delete=models.SET_NULL, null=True)
    tipoProducto = models.ForeignKey(TipoProducto, on_delete=models.SET_NULL, null=True)
    familiaProducto = models.ForeignKey(FamiliaProducto, on_delete=models.SET_NULL, null=True)
    factor_multiplicacion = models.FloatField(default=1)

    def __str__(self):
        return self.nombre_completo


# Definición de la clase USUARIO
class Usuario(models.Model):
    ROL_USUARIO_CHOICES = (
        ('EMP', 'Empleado'),
        ('REP', 'Repartidor'),
        ('SUP', 'Supervisor'),
        ('ADM', 'Administrador'),
    )
    rol_usuario = models.CharField(max_length=3,choices=ROL_USUARIO_CHOICES)
    nombre_completo = models.CharField(max_length=50)
    accionesPermitidas = models.ManyToManyField(Accion)

class EntregaCliente(models.Model):
    fecha_entrega = models.DateField()
    fecha_alta_entrega = models.DateField(auto_now=True)
    punto_limpieza_cliente = models.ForeignKey(PuntoLimpiezaCliente, on_delete=models.PROTECT)
    usuario_alta = models.ForeignKey(User, on_delete=models.DO_NOTHING)

class ItemEntregaCliente(models.Model):
    entregaCliente = models.ForeignKey(EntregaCliente, related_name='itemsEntrega', on_delete=models.CASCADE)
    fecha_alta_item_entrega = models.DateField(auto_now=True)
    producto = models.ForeignKey(Producto, related_name='productosEntrega', on_delete=models.PROTECT)
    cantidad = models.IntegerField()
    esEntrega = models.BooleanField()

# Definición de las FACTURAS de COMPRA
class FacturaCompra(models.Model):
    fecha_factura_compra = models.DateField()
    fecha_alta_factura = models.DateField()
    proveedor = models.ForeignKey(Proveedor, on_delete=models.PROTECT)
    usuario_alta = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    importe_neto_gravado = models.FloatField()
    importe_total = models.FloatField()
    iva27 = models.FloatField()
    iva21 = models.FloatField()
    iva105 = models.FloatField()
    iva0 = models.FloatField()


class ItemsFactura(models.Model):
    facturaCompra = models.ForeignKey(FacturaCompra, related_name='itemsFactura', on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.PROTECT)
    cantidad = models.IntegerField()
    precio_compra = models.FloatField()
    unidad_medida = models.CharField(max_length=10)
    alicuotaIVA = models.FloatField()


# Definición de las ORDENES de COMPRA
class OrdenCompra(models.Model):
    fecha_orden_compra = models.DateField()
    fecha_alta_orden = models.DateField()
    proveedor = models.ForeignKey(Proveedor, on_delete=models.CASCADE)
    usuario_alta = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    productos = models.ManyToManyField(
        Producto,
        through='ItemsOrdenCompra',
        through_fields=('ordenCompra', 'producto'),
    )

class ItemsOrdenCompra(models.Model):
    ordenCompra = models.ForeignKey(OrdenCompra, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField()




# Definición del STOCK de los productos
class StockHistoricoProducto(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name='stocks')
    #itemFactura = models.ForeignKey(ItemsFactura, unique=True, on_delete=models.CASCADE)
    itemFactura = models.OneToOneField(ItemsFactura, on_delete=models.CASCADE, null=True)
    itemEntrega = models.OneToOneField(ItemEntregaCliente, on_delete=models.CASCADE, null=True)
    fecha_alta = models.DateField()
    cantidad = models.IntegerField()
    KANBAN_STATIONS = (
            ('OC_IN', 'Ingreso de Orden de Compra'),
            ('OC_OUT', 'Egreso de Orden de Compra'),
            ('ST_IN', 'Ingreso de Stock'),
            ('ST_OUT', 'Egreso de Stock'),
        )
    estacion_kanban = models.CharField(null=True, max_length=6, choices=KANBAN_STATIONS)
    estado = models.IntegerField(null=True)

    
# Definición de los PRECIOS de los productos
class PrecioHistoricoProducto(models.Model):
    fecha_inicio = models.DateField()
    importe = models.FloatField()
    #isCurrent = models.BooleanField()
    producto = models.ForeignKey(Producto, related_name='preciosProducto', on_delete=models.CASCADE)
    #itemFactura = models.ForeignKey(ItemsFactura, unique=True, on_delete=models.CASCADE)
    itemFactura = models.OneToOneField(ItemsFactura, on_delete=models.CASCADE, null=True)
    class Meta:
        ordering = ['-fecha_inicio']
    
# Definición de las acciones realizadas por los usuarios
class AccionesRealizadasUsuario(models.Model):
    accion = models.ForeignKey(Accion, on_delete=models.DO_NOTHING)
    usuario = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    fecha_accion = models.DateField(auto_now=True)
    descripcion = models.CharField(max_length=150)













