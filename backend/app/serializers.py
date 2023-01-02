from rest_framework import serializers
from accounts.serializers import UserSerializer
from app.models import Product, Line,  Make

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"

class LineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Line
        fields = "__all__"


class MakeSerializer(serializers.ModelSerializer):
    line = LineSerializer()
    product = ProductSerializer()
    pic = UserSerializer()

    class Meta:
        model = Make
        fields = "__all__"

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['created_at'] = instance.created_at.strftime('%d-%m-%Y')
        representation['efficiency'] = (int(instance.finish) / int(instance.targer)) * 100
        return representation