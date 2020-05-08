from .models import Message, PrecioHistoricoProducto, StockHistoricoProducto, Producto, Proveedor
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

class ProductoSerializer(serializers.ModelSerializer):
    nombre_proveedor = serializers.ReadOnlyField(source='proveedor.nombre_completo')
    descripcion_tipo_producto = serializers.ReadOnlyField(source='tipoProducto.descripcion')
    descripcion_familia_producto = serializers.ReadOnlyField(source='familiaProducto.descripcion')
    class Meta:
        model = Producto
        fields = '__all__'

