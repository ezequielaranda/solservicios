from .models import Message, EstadoProducto, TipoProducto, FamiliaProducto, FacturaCompra, EntregaCliente, PrecioHistoricoProducto, StockHistoricoProducto, Producto, Proveedor, Accion, Cliente, PuntoLimpiezaCliente, Proveedor, ItemsFactura, ItemEntregaCliente
from django.contrib.auth.models import User
from rest_framework import serializers

class MessageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Message
        fields = ('url', 'subject', 'body', 'pk')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'username', 'password', 'is_active', 'is_superuser', 'is_staff')

class PrecioHistoricoProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrecioHistoricoProducto
        fields = '__all__'

class StockHistoricoProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockHistoricoProducto
        fields = '__all__'

class AccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Accion
        fields = '__all__'

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'

class PuntoLimpiezaClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = PuntoLimpiezaCliente
        fields = '__all__'

class ProveedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proveedor
        fields = '__all__'

class ItemsFacturaSerializer(serializers.ModelSerializer):
    nombre_producto = serializers.ReadOnlyField(source='producto.nombre_completo', read_only=True)
    class Meta:
        model = ItemsFactura
        fields = ['id','nombre_producto', 'facturaCompra', 'producto', 'cantidad', 'precio_compra','unidad_medida', 'alicuotaIVA']

class ItemEntregaClienteSerializer(serializers.ModelSerializer):
    nombre_producto = serializers.ReadOnlyField(source='producto.nombre_completo', read_only=True)
    class Meta:
        model = ItemEntregaCliente
        fields = ['id','nombre_producto', 'entregaCliente', 'producto', 'cantidad', 'esEntrega', 'fecha_alta_item_entrega']

class EntregaClienteSerializer(serializers.ModelSerializer):
    nombre_punto_limpieza_cliente = serializers.ReadOnlyField(source='punto_limpieza_cliente.nombre_completo', read_only=True)
    nombre_cliente = serializers.ReadOnlyField(source='punto_limpieza_cliente.cliente.nombre_completo', read_only=True)
    itemsEntrega = ItemEntregaClienteSerializer(many=True, read_only=True)
    class Meta:
        model = EntregaCliente
        fields = '__all__'

class ProductoSerializer(serializers.ModelSerializer):
    nombre_proveedor = serializers.ReadOnlyField(source='proveedor.nombre_completo')
    descripcion_tipo_producto = serializers.ReadOnlyField(source='tipoProducto.descripcion')
    descripcion_familia_producto = serializers.ReadOnlyField(source='familiaProducto.descripcion')
    descripcion_estado = serializers.ReadOnlyField(source='estado.codigo')
    class Meta:
        model = Producto
        fields = '__all__'

class ProductoStockSerializer(serializers.ModelSerializer):
    total_stock = serializers.IntegerField()
    class Meta:
        model = Producto
        fields =  ['id', 'nombre_completo', 'total_stock']

class ProductoReporteConsumoSerializer(serializers.ModelSerializer):
    total_entregado = serializers.IntegerField()
    class Meta:
        model = Producto
        fields =  ['id', 'nombre_completo', 'total_entregado']

class ProductoPreciosSerializer(serializers.ModelSerializer):
    nombre_proveedor = serializers.ReadOnlyField(source='proveedor.nombre_completo', read_only=True)
    preciosProducto = PrecioHistoricoProductoSerializer(many=True, read_only=True)
    class Meta:
        model = Producto
        fields =  ['id', 'nombre_completo', 'nombre_proveedor', 'preciosProducto']

class FacturaCompraSerializer(serializers.ModelSerializer):
    nombre_proveedor = serializers.ReadOnlyField(source='proveedor.nombre_completo', read_only=True)
    itemsFactura = ItemsFacturaSerializer(many=True, read_only=True)
    class Meta:
        model = FacturaCompra
        fields = '__all__'
        #depth = 1

class FacturaCompraCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = FacturaCompra
        fields = '__all__'
        #depth = 1

class TipoProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoProducto
        fields = '__all__'

class EstadoProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoProducto
        fields = '__all__'

class FamiliaProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FamiliaProducto
        fields = '__all__'
